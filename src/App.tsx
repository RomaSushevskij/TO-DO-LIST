import React, {useEffect} from 'react';
import './App.css';

import {InputWithButton} from "./components/InputWithButton/InputWithButton";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {createTodolist, getToDoLists, TodolistType} from "./store/reducers/todolists/todolistReducer";
import {AppStateType} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {Todolist} from './components/Todolist/Todolist';

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
            <Container fixed>
                <Grid container style={{justifyContent: 'center', margin: '20px 0'}}>
                    <InputWithButton inputLabel={'Todolist title'} buttonName={'x'} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}
                      style={{justifyContent: 'center'}}>
                    {todolists.map(td => {
                        return (
                            <Grid key={td.id} item>
                                <Paper style={{backgroundColor: '#ffffff', padding: '1px 20px 20px 20px'}}>
                                    <Todolist
                                        todolistID={td.id}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;