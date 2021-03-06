import style from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import React, {useCallback} from "react";
import {AppStateType} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {removeTask, updateTask} from "../../../store/reducers/tasks/tasksReducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = React.memo(({
                                    todolistID,
                                    taskID,

                                }: TaskPropsType) => {
    const task = useSelector<AppStateType, TaskType>(state => {
        return state.tasks[todolistID].filter(task => task.id === taskID)[0]
    })
    const dispatch = useDispatch()

    const onUpdateTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTask(todolistID, taskID, {title: newTitle}))
    }, [dispatch, todolistID, taskID]);

    const onUpdateTaskStatus = useCallback((event) => {
        const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTask(todolistID, taskID, {status}))
    }, [dispatch, todolistID, taskID])
    const onClickRemovingTaskHandler = useCallback(() => {
        dispatch(removeTask(todolistID, taskID))
    }, [dispatch, todolistID, taskID])

    return (
            <li className={task.status === TaskStatuses.Completed ? style.isDone : ''}>
                <Checkbox checked={task.status === TaskStatuses.Completed}
                          onChange={onUpdateTaskStatus}
                          style={{color:'rgba(98,194,118,0.79)'}}
                          color={"success"}/>
                <EditableSpan labelInput='Task title' updateTitle={onUpdateTaskTitleHandler} title={task.title}/>
                <IconButton className={style.removeButton}
                            onClick={onClickRemovingTaskHandler}
                            aria-label="delete" size="small">
                    <Delete style={{color: '#D39BC3'}}/>
                </IconButton>
            </li>
    )
})