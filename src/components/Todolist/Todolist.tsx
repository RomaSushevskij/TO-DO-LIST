import React from "react";
import style from './Todolist.module.css'
import {TasksMap} from "../TasksMap/TasksMap";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {InputWithButton} from "../InputWithButton/InputWithButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import {createTask} from "../../store/reducers/tasks/tasksReducer";
import {
    changeFilter,
    FilterValueType,
    removeTodolist,
    TodolistType,
    updateTodolistTitle
} from "../../store/reducers/todolists/todolistReducer";
import Paper from '@mui/material/Paper';
import {getTasksForCurrentTodolist} from '../../store/selectors/tasks-selectors';
import {getCurrentTodolist} from '../../store/selectors/todolists-selectors';
import {useAppDispatch, useAppSelector} from '../../hooks';

export type TodolistPropsType = {
    todolistID: string
}

export const Todolist = ({todolistID}: TodolistPropsType) => {

    const dispatch = useAppDispatch();

    const todolist: TodolistType = useAppSelector((state) => getCurrentTodolist(state, todolistID));
    const tasks = useAppSelector(state => getTasksForCurrentTodolist(state, todolistID));
    const isDisabled = todolist.entityStatus === 'loading';

    //functionality for removing todolists
    const onClickRemovingTodolistHandler = () => {
        dispatch(removeTodolist(todolistID))
    };

    //functionality for filtering tasks
    const onClickFilterType = (filterType: FilterValueType) => {
        dispatch(changeFilter({todolistID: todolistID, filterType}))
    };

    //functionality for adding tasks
    const onClickAddTaskHandler = (newTitleTask: string) => {
        dispatch(createTask({todolistId: todolistID, title: newTitleTask}));
    };

    //functionality for update todolist
    const onUpdateTodolistTitle = (newTitle: string) => {
        dispatch(updateTodolistTitle({todolistId: todolistID, title: newTitle}))
    };

    return (
        <div className={style.todolistWrapper}
             draggable>
            <Paper style={{backgroundColor: '#EBECF0', padding: '1px 20px 20px 20px'}}>
                <div className={style.todolistHeader}>
                    <h3>
                        <EditableSpan labelInput='Todolist title'
                                      title={todolist.title}
                                      updateTitle={onUpdateTodolistTitle}/>
                        <IconButton className={style.removeButton}
                                    onClick={onClickRemovingTodolistHandler}
                                    aria-label="delete" size="small"
                                    disabled={isDisabled}>
                            <Close style={{color: `${isDisabled ? '#C2C2C2' : '#172B4D'}`}}/>
                        </IconButton>
                    </h3>
                </div>
                <div className={style.inputWithButtonBlock}>
                    <InputWithButton inputLabel={'Task title'}
                                     buttonName={'+'}
                                     addItem={onClickAddTaskHandler}
                                     disabled={todolist.entityStatus === 'loading'}/>
                </div>
                <TasksMap todolistID={todolistID}/>
                {tasks && tasks.length > 0 &&
                <div className={style.buttonsBlock}>
                    <ButtonGroup color={"inherit"} variant="text" aria-label="text button group">
                        <Button onClick={() => onClickFilterType('All')}
                                variant={todolist.filter === 'All' ? "contained" : "text"}
                                style={{backgroundColor: `${todolist.filter === 'All' ? '#FBDC97' : ''}`}}>
                            All
                        </Button>
                        <Button onClick={() => onClickFilterType('Active')}
                                variant={todolist.filter === 'Active' ? "contained" : "text"}
                                style={{backgroundColor: `${todolist.filter === 'Active' ? 'rgba(98,194,118,0.65)' : ''}`}}>
                            Active
                        </Button>
                        <Button onClick={() => onClickFilterType('Completed')}
                                variant={todolist.filter === 'Completed' ? "contained" : "text"}
                                style={{backgroundColor: `${todolist.filter === 'Completed' ? 'rgba(39,182,186,0.59)' : ''}`}}>
                            Completed
                        </Button>
                    </ButtonGroup>
                </div>
                }
            </Paper>
        </div>
    );
};

