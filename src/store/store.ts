import {GeneralTasksACType, tasksReducer} from "./reducers/tasks/tasksReducer";
import {GeneralTodolistsACType, todolistsReducer} from "./reducers/todolists/todolistReducer";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    | GeneralTasksACType
    | GeneralTodolistsACType
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
    >
//@ts-ignore
window.store = store