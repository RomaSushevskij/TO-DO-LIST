import style from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import React, {DragEvent, useCallback} from "react";
import {removeTask, reorderTask, setReplacementTask, updateTask} from "../../../store/reducers/tasks/tasksReducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {getCurrentTask, getReplacementTask} from '../../../store/selectors/tasks-selectors';
import {useAppDispatch, useAppSelector} from '../../../hooks';

type TaskPropsType = {
    todolistID: string
    taskID: string
    index: number
}

export const Task = React.memo(({
                                    todolistID,
                                    taskID,
                                    index
                                }: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const currentTask = useAppSelector(state => getCurrentTask(state, todolistID, taskID));
    const replacementTask = useAppSelector(getReplacementTask);
    const taskClassName = currentTask.status === TaskStatuses.Completed ? `${style.isDone} ${style.content}` : style.content;
    const finalTaskClassName = `${style.wrapperTask} ${ index === 0 ? style.firstTask : style.replaceableTask}`;

    const onTaskTitleUpdate = useCallback((title: string) => {
        dispatch(updateTask({todolistId: todolistID, taskId: taskID, model: {title}}))
    }, [dispatch, todolistID, taskID]);

    const onTaskStatusUpdate = useCallback((event) => {
        const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTask({todolistId: todolistID, taskId: taskID, model: {status}}))
    }, [dispatch, todolistID, taskID]);

    const onRemoveTaskClick = useCallback(() => {
        dispatch(removeTask({todolistId: todolistID, taskId: taskID}))
    }, [dispatch, todolistID, taskID]);

    const onTaskDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '0';
        dispatch(setReplacementTask({replacementTask: currentTask}));
    };

    const onTaskDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.className = style.wrapperTask;
    };

    const onTaskDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '100';
    };

    const onTaskDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.className = finalTaskClassName;

    };


    const onTaskDrop = (e: DragEvent<HTMLDivElement>, currentTask: TaskType) => {
        e.preventDefault();
        e.currentTarget.className = style.wrapperTask;
        const replaceableId = index === 0 ? null :currentTask.id;
        dispatch(reorderTask({todolistId: todolistID, taskId: replacementTask.id, replaceableId}))

    };

    return (
        <div className={style.wrapperTask}
             draggable
             onDragStart={onTaskDragStart}
             onDragLeave={onTaskDragLeave}
             onDragOver={onTaskDragOver}
             onDragEnd={onTaskDragEnd}
             onDrop={e => onTaskDrop(e, currentTask)}>
            <div className={taskClassName}>
                <Checkbox checked={currentTask.status === TaskStatuses.Completed}
                          onChange={onTaskStatusUpdate}
                          style={{color: 'rgba(98,194,118,0.79)'}}
                          color={"success"}/>
                <EditableSpan labelInput='Task title' updateTitle={onTaskTitleUpdate} title={currentTask.title}/>
                <IconButton className={style.removeButton}
                            onClick={onRemoveTaskClick}
                            aria-label="delete" size="small">
                    <Delete style={{color: '#D39BC3'}}/>
                </IconButton>
            </div>
        </div>
    )
});