import {todolistAPI, TodolistResponseType} from "../../../api/todolist-api";
import {AppThunk} from '../../store';
import {setAppStatusAC} from '../app/appReducer';

const CHANGE_FILTER = 'CHANGE-FILTER';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const ADD_TODOLIST = 'ADD-TODOLIST';
const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE';
export const SET_TODOLISTS = 'SET_TODOLISTS';

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = TodolistResponseType & {
    filter: FilterValueType
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: GeneralTodolistsACType): Array<TodolistType> => {
    switch (action.type) {
        case CHANGE_FILTER:
            return state.map(td => td.id === action.payload.todolistID ? {
                ...td,
                filter: action.payload.filterType
            } : td);
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.payload.todolistID);
        case ADD_TODOLIST:
            return [{...action.payload.todolist, filter: "All"}, ...state]
        case UPDATE_TODOLIST_TITLE:
            return state.map(td => td.id === action.payload.todolistID ? {...td, title: action.payload.newTitle} : td)
        case 'SET_TODOLISTS':
            return action.payload.todolists.map(td => ({...td, filter: 'All'}))
        default:
            return state
    }
};
export type  AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsType = ReturnType<typeof setToDoListsAC>

export type GeneralTodolistsACType =
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof setToDoListsAC>

// A C T I O N S
export const changeFilterAC = (todolistID: string, filterType: FilterValueType) => ({
    type: CHANGE_FILTER,
    payload: {todolistID, filterType}
} as const);
export const removeTodolistAC = (todolistID: string) => ({
    type: REMOVE_TODOLIST,
    payload: {todolistID}
} as const);
export const addTodolistAC = (todolist: TodolistResponseType) => ({
    type: ADD_TODOLIST,
    payload: {todolist}
} as const);
export const updateTodolistTitleAC = (todolistID: string, newTitle: string) => ({
    type: UPDATE_TODOLIST_TITLE,
    payload: {todolistID, newTitle}
} as const);
export const setToDoListsAC = (todolists: TodolistResponseType[]) => ({
    type: SET_TODOLISTS,
    payload: {todolists}
} as const);

// T H U N K S
export const getToDoLists = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(data => {
            dispatch(setToDoListsAC(data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const createTodolist = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(data => {
            dispatch(addTodolistAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const removeTodolist = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(data => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTodolistTitle = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(data => {
            dispatch(updateTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}