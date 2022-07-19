import React, {useEffect} from 'react';
import './App.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {initializeApp} from './store/reducers/app/appReducer';
import {ErrorSnackbar} from './components/ErrorSnackar/ErrorSnackbar';
import {TodolistList} from './components/TodolistList/TodolistList';
import Container from '@mui/material/Container';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Preloader} from './components/Preloader/Preloader';
import {logout} from './store/reducers/auth/authReducer';
import style from './App.module.css'
import {getIsInitialized, getStatus} from './store/selectors/app-selectors';
import {getIsLoggedIn} from './store/selectors/auth-selectors';
import {useAppDispatch, useAppSelector} from './hooks';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {reorderTask} from './store/reducers/tasks/tasksReducer';

const appBapStyle = {
    backgroundColor: 'rgba(0,0,0,0.2)',
    boxShadow: 'none',
    color: 'rgba(255,255,255,0.7)',
};

function App() {

    const dispatch = useAppDispatch();

    const status = useAppSelector(getStatus);
    const isInitialized = useAppSelector(getIsInitialized);
    const isLoggedIn = useAppSelector(getIsLoggedIn);

    const logoutHandler = () => {
        dispatch(logout())
    };

    const onTaskDragEnd = (result: DropResult) => {
        console.log(result);
        const draggableTaskIndex = result.source.index;
        const replaceableTaskIndex = result.destination?.index;
        const todolistId = result.source.droppableId;
        const draggableTaskId = result.draggableId;
        dispatch(reorderTask({
            todolistId,
            draggableTaskIndex: draggableTaskIndex,
            replaceableTaskIndex,
            draggableTaskId: draggableTaskId
        }))
    };

    useEffect(() => {
        dispatch(initializeApp())
    }, []);

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <DragDropContext onDragEnd={onTaskDragEnd}>
            <div className="App">
                <AppBar position="static" style={appBapStyle}>
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
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                    </Toolbar>
                </AppBar>
                <div className={style.progressBar}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
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
        </DragDropContext>
    );
}

export default App;