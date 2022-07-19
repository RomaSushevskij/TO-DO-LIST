import style from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import React, {useCallback} from "react";
import {removeTask, updateTask} from "../../../store/reducers/tasks/tasksReducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {getCurrentTask, getReplacementTask} from '../../../store/selectors/tasks-selectors';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {Draggable} from 'react-beautiful-dnd';

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
    const taskClassName = currentTask.status === TaskStatuses.Completed ? `${style.isDone} ${style.content}` : style.content;

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

    return (
        <Draggable draggableId={taskID} index={index}>
            {(provided, snapshot) => {
                const dragStyle = {
                    boxShadow: snapshot.isDragging ? '0 6px 6px hsl(0deg 0% 0% / 0.3)' : '',
                    ...provided.draggableProps.style,
                };
                return (
                    <li className={taskClassName}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={dragStyle}
                    >
                        <Checkbox checked={currentTask.status === TaskStatuses.Completed}
                                  onChange={onTaskStatusUpdate}
                                  style={{color: 'rgba(98,194,118,0.79)'}}
                                  color={"success"}/>
                        <EditableSpan labelInput='Task title' updateTitle={onTaskTitleUpdate}
                                      title={currentTask.title}/>
                        <IconButton className={style.removeButton}
                                    onClick={onRemoveTaskClick}
                                    aria-label="delete" size="small">
                            <Delete style={{color: '#D39BC3'}}/>
                        </IconButton>

                    </li>
                )
            }}
        </Draggable>

    )
});