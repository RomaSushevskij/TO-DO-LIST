import style from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import React, {useCallback} from "react";
import {removeTask, updateTask} from "../../../store/reducers/tasks/tasksReducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {getCurrentTask} from '../../../store/selectors/tasks-selectors';
import {useAppDispatch, useAppSelector} from '../../../hooks';

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = React.memo(({
                                    todolistID,
                                    taskID,
                                }: TaskPropsType) => {

    const dispatch = useAppDispatch();

    const currentTask = useAppSelector(state => getCurrentTask(state, todolistID, taskID));

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
        <li className={currentTask.status === TaskStatuses.Completed ? style.isDone : ''}>
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
        </li>
    )
});