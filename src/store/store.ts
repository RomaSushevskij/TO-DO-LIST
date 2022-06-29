import {GeneralTasksACType, tasksReducer} from "./reducers/tasks/tasksReducer";
import {GeneralTodolistsACType, todolistsReducer} from "./reducers/todolists/todolistReducer";
import {combineReducers} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {appReducer, GeneralAppActionsType} from './reducers/app/appReducer';
import {authReducer, GeneralAuthACType} from './reducers/auth/authReducer';
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    | GeneralTasksACType
    | GeneralTodolistsACType
    | GeneralAppActionsType
    | GeneralAuthACType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export type NullableType<T> = null | T;