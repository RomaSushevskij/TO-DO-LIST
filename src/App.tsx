import React, {useEffect} from 'react';
import './App.module.css';
import style from './App.module.css'

import {InputWithButton} from "./components/InputWithButton/InputWithButton";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {createTodolist, getToDoLists, TodolistType} from "./store/reducers/todolists/todolistReducer";
import {AppStateType, useAppSelector} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {Todolist} from './components/Todolist/Todolist';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from './store/reducers/app/appReducer';
import {ErrorSnackbar} from './components/ErrorSnackar/ErrorSnackbar';

function App() {
    const todolists: Array<TodolistType> = useSelector((state: AppStateType) => state.todolists)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getToDoLists())
    }, [])
    //functionality for adding todolists
    const addTodolist = (newTodolistTitle: string) => {
        dispatch(createTodolist(newTodolistTitle))
    };
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'warning'}/>}
            <Container fixed>
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
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;