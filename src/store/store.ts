import {tasksReducer} from "./reducers/tasks/tasksReducer";
import {todolistsReducer} from "./reducers/todolists/todolistReducer";
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './reducers/app/appReducer';
import {authReducer} from './reducers/auth/authReducer';
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type NullableType<T> = null | T;