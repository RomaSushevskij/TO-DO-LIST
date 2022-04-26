import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {InputWithButton} from "../InputWithButton/InputWithButton"
import {Todolist} from '../Todolist/Todolist';
import {createTodolist, TodolistType} from '../../store/reducers/todolists/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../store/store';

export const TodolistList = ()=>{
    const dispatch = useDispatch()
    const todolists: Array<TodolistType> = useSelector((state: AppStateType) => state.todolists)
    //functionality for adding todolists
    const addTodolist = (newTodolistTitle: string) => {
        dispatch(createTodolist(newTodolistTitle))
    };
    return (
        <>
            <Grid container style={{justifyContent: 'center', margin: '20px 0'}}>
                <InputWithButton inputLabel={'Todolist title'}
                                 buttonName={'x'}
                                 addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}
                  style={{justifyContent: 'center'}}>
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