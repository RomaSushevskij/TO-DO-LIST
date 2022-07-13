import Grid from "@mui/material/Grid";
import {InputWithButton} from "../InputWithButton/InputWithButton"
import {Todolist} from '../Todolist/Todolist';
import {createTodolist, getToDoLists} from '../../store/reducers/todolists/todolistReducer';
import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';
import {getIsLoggedIn} from '../../store/selectors/auth-selectors';
import {getTodolists} from '../../store/selectors/todolists-selectors';
import {useAppDispatch, useAppSelector} from '../../hooks';

export const TodolistList = () => {

    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(getIsLoggedIn);
    const todolists = useAppSelector(getTodolists);

    //functionality for adding todolists
    const addTodolist = (newTodolistTitle: string) => {
        dispatch(createTodolist(newTodolistTitle))
    };

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getToDoLists())
    }, []);

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
                {todolists.map(({id}) => {
                    return (
                        <Grid key={id} item>
                            <Todolist todolistID={id}/>
                        </Grid>)
                })}
            </Grid>
        </>
    )
};