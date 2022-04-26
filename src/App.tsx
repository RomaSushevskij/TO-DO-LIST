import React, {useEffect} from 'react';
import './App.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {getToDoLists} from "./store/reducers/todolists/todolistReducer";
import {useAppSelector} from "./store/store";
import {useDispatch} from "react-redux";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from './store/reducers/app/appReducer';
import {ErrorSnackbar} from './components/ErrorSnackar/ErrorSnackbar';
import {TodolistList} from './components/TodolistList/TodolistList';
import Container from '@mui/material/Container';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';

function App() {
    useEffect(() => {
        dispatch(getToDoLists())
    }, [])
    const dispatch = useDispatch()
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
                {status === 'loading' && <LinearProgress color={'warning'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'404'} element={<h1>404 page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;