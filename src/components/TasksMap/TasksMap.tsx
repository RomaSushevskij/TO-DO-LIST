import style from "./TaskMap.module.css";
import React from "react";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../api/todolist-api";
import {getTasksForCurrentTodolist} from '../../store/selectors/tasks-selectors';
import {getCurrentTodolist} from '../../store/selectors/todolists-selectors';
import {useAppSelector} from '../../hooks';
import {Draggable, Droppable} from 'react-beautiful-dnd';

type TasksPropsType = {
    todolistID: string
}

export const TasksMap = React.memo(({todolistID}: TasksPropsType) => {

    const currentTodolist = useAppSelector(state => getCurrentTodolist(state, todolistID));
    const tasksForCurrentTodolist = useAppSelector(state => getTasksForCurrentTodolist(state, todolistID));

    let filteredTasks = tasksForCurrentTodolist;
    if (currentTodolist.filter === 'Active') {
        filteredTasks = tasksForCurrentTodolist.filter(task => task.status === TaskStatuses.New)
    }
    if (currentTodolist.filter === 'Completed') {
        filteredTasks = tasksForCurrentTodolist.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <Droppable droppableId={todolistID}>
            {(provided) => (
                <ul className={style.tasksWrapper}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {filteredTasks.map(({id}, ind) => {
                        return <Task key={id}
                                     taskID={id}
                                     todolistID={todolistID}
                                     index={ind}/>
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    )
});
