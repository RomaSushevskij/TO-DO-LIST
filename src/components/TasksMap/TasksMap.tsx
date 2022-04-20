import style from "./TaskMap.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {TodolistType} from "../../store/reducers/todolists/todolistReducer";

type TasksPropsType = {
    todolistID: string
}

export const TasksMap = React.memo((props: TasksPropsType) => {

    const tasks: Array<TaskType> = useSelector(((state: AppStateType) => state.tasks[props.todolistID]))
    const selectTodolist = (state: AppStateType) => state.todolists.filter(td => td.id === props.todolistID)[0]
    const todolist: TodolistType = useSelector(selectTodolist)


    let filteredTasks = tasks;
    if (todolist.filter === 'Active') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (todolist.filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <ul className={style.taskWrapper}>
            {filteredTasks.map(task => {
                return <Task key={task.id}
                             taskID={task.id}
                             todolistID={props.todolistID}/>
            })}
        </ul>
    )
});
