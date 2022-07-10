import Grid from "@mui/material/Grid";
import {InputWithButton} from "../InputWithButton/InputWithButton"
import {Todolist} from '../Todolist/Todolist';
import {createTodolist, getToDoLists, TodolistType} from '../../store/reducers/todolists/todolistReducer';
import {useSelector} from 'react-redux';
import {AppStateType, useAppDispatch, useAppSelector} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';

export const TodolistList = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();
    const todolists: Array<TodolistType> = useSelector((state: AppStateType) => state.todolists)
    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getToDoLists())
    }, [])
    //functionality for adding todolists
    const addTodolist = (newTodolistTitle: string) => {
        dispatch(createTodolist(newTodolistTitle))
    };
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{justifyContent: 'center', margin: '20px 0', marginBottom: '30px'}}>
                <InputWithButton inputLabel={'Todolist title'}
                                 buttonName={'x'}
                                 addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}
                  style={{justifyContent: 'center', marginBottom: '30px'}}>
                {todolists.map(td => {
                    return (
                        <Grid key={td.id} item>
                            <Todolist todolistID={td.id}/>
                        </Grid>)
                })}
            </Grid>
        </>
    )
}