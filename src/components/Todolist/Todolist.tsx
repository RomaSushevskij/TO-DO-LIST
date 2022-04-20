import React, {useEffect} from "react";
import style from './Todolist.module.css'
import {TasksMap} from "../TasksMap/TasksMap";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {InputWithButton} from "../InputWithButton/InputWithButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {addTask, getTasks} from "../../store/reducers/tasks/tasksReducer";
import {
    changeFilterAC,
    FilterValueType,
    removeTodolist,
    TodolistType,
    updateTodolistTitle
} from "../../store/reducers/todolists/todolistReducer";


type TodolistPropsType = {
    todolistID: string
}


export const Todolist = (props: TodolistPropsType) => {
    const selectTodolist = (state: AppStateType) => state.todolists.filter(td => td.id === props.todolistID)[0]
    const todolist: TodolistType = useSelector(selectTodolist)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks(props.todolistID))
    }, [])
    //functionality for removing todolists
    const onClickRemovingTodolistHandler = () => {
        dispatch(removeTodolist(props.todolistID))
    };
    //functionality for filtering tasks
    const onClickFilterType = (filterType: FilterValueType) => {
        dispatch(changeFilterAC(props.todolistID, filterType))
    };

    //functionality for adding tasks
    const onClickAddTaskHandler = (newTitleTask: string) => {
        dispatch(addTask(props.todolistID, newTitleTask));
    }

    //functionality for update todolist
    const onUpdateTodolistTitle = (newTitle: string) => {
        dispatch(updateTodolistTitle(props.todolistID, newTitle))
    };

    return (
        <div className={style.todolistWrapper}>
            <h3>
                <EditableSpan labelInput='Todolist title'
                              title={todolist.title}
                              updateTitle={onUpdateTodolistTitle}/>
                <IconButton className={style.removeButton} onClick={onClickRemovingTodolistHandler}
                            aria-label="delete" size="small">
                    <Close style={{color: '#E94C3B'}}/>
                </IconButton>
            </h3>
            <div>
                <InputWithButton inputLabel={'Task title'} buttonName={'+'} addItem={onClickAddTaskHandler}/>
            </div>
            <TasksMap todolistID={props.todolistID}/>
            <div>
                <ButtonGroup color={"inherit"} variant="text" aria-label="text button group">
                    <Button onClick={() => onClickFilterType('All')}
                            variant={todolist.filter === 'All' ? "contained" : "text"}
                            style={{backgroundColor: `${todolist.filter === 'All' ? '#FFB024' : ''}`}}>
                        All
                    </Button>
                    <Button onClick={() => onClickFilterType('Active')}
                            variant={todolist.filter === 'Active' ? "contained" : "text"}
                            style={{backgroundColor: `${todolist.filter === 'Active' ? '#62C276' : ''}`}}>
                        Active
                    </Button>
                    <Button onClick={() => onClickFilterType('Completed')}
                            variant={todolist.filter === 'Completed' ? "contained" : "text"}
                            style={{backgroundColor: `${todolist.filter === 'Completed' ? '#27B6BA' : ''}`}}>
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

