import {RESULT_CODES, todolistAPI, TodolistResponseType} from "../../../api/todolist-api";
import {AppDispatch} from '../../store';
import {RequestStatusType, setAppStatus} from '../app/appReducer';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {getTasks} from '../tasks/tasksReducer';

export enum TODOLISTS_ACTIONS_TYPES {
    CHANGE_TODOLIST_FILTER = 'TODOLIST/CHANGE-FILTER',
    REMOVE_TODOLIST = 'TODOLIST/REMOVE-TODOLIST',
    ADD_TODOLIST = 'TODOLIST/ADD_TODOLIST',
    UPDATE_TODOLIST_TITLE = 'TODOLIST/UPDATE_TODOLIST_TITLE',
    SET_TODOLISTS = 'TODOLIST/SET_TODOLISTS',
    CHANGE_TODOLIST_ENTITY_STATUS = 'TODOLIST/CHANGE_TODOLIST_ENTITY_STATUS',
    RESET_TODOLISTS_DATA = 'TODOLIST/RESET_TODOLISTS_DATA',
}

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = TodolistResponseType & {
    filter: FilterValueType
    entityStatus: RequestStatusType,
}

const initialState: TodolistType[] = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: GeneralTodolistsACType): Array<TodolistType> => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER:
            return state.map(td => td.id === action.payload.todolistID ? {
                ...td,
                filter: action.payload.filterType
            } : td);
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.payload.todolistID);
        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return [{...action.payload.todolist, filter: "All", entityStatus: 'idle'}, ...state]
        case TODOLISTS_ACTIONS_TYPES.UPDATE_TODOLIST_TITLE:
            return state.map(td => td.id === action.payload.todolistID ? {...td, title: action.payload.newTitle} : td)
        case TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS:
            return action.payload.todolists.map(td => ({...td, filter: 'All', entityStatus: 'idle'}))
        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map((td => td.id === action.payload.todolistId ?
                {...td, entityStatus: action.payload.entityStatus} : td))
        case TODOLISTS_ACTIONS_TYPES.RESET_TODOLISTS_DATA:
            return []
        default:
            return state
    }
};
export type  AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsType = ReturnType<typeof setToDoListsAC>
export type ResetTodolistsDataType = ReturnType<typeof resetTodolistsDataAC>

export type GeneralTodolistsACType =
    | ReturnType<typeof changeFilterAC>
    | RemoveTodolistType
    | AddTodolistType
    | ReturnType<typeof updateTodolistTitleAC>
    | SetTodolistsType
    | ReturnType<typeof changeToDoListsEntityStatusAC>
    | ResetTodolistsDataType

// A C T I O N S
export const changeFilterAC = (todolistID: string, filterType: FilterValueType) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER,
    payload: {todolistID, filterType}
} as const);
export const removeTodolistAC = (todolistID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST,
    payload: {todolistID}
} as const);
export const addTodolistAC = (todolist: TodolistResponseType) => ({
    type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST,
    payload: {todolist}
} as const);
export const updateTodolistTitleAC = (todolistID: string, newTitle: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.UPDATE_TODOLIST_TITLE,
    payload: {todolistID, newTitle}
} as const);
export const setToDoListsAC = (todolists: TodolistResponseType[]) => ({
    type: TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS,
    payload: {todolists}
} as const);
export const changeToDoListsEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_ENTITY_STATUS,
    payload: {todolistId, entityStatus}
} as const)
export const resetTodolistsDataAC = () => ({
    type: TODOLISTS_ACTIONS_TYPES.RESET_TODOLISTS_DATA
} as const)

// T H U N K S
export const getToDoLists = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    todolistAPI.getTodolists()
        .then(data => {
            dispatch(setToDoListsAC(data))
            return data
        })
        .then(data => {
            data.forEach((todolist => {
                dispatch(getTasks(todolist.id))
            }))
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const createTodolist = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(addTodolistAC(data.data.item))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        })

}
export const removeTodolist = (todolistId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeToDoListsEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(removeTodolistAC(todolistId))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeToDoListsEntityStatusAC(todolistId, 'succeeded'))
        })
}
export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolist(todolistId, title)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(updateTodolistTitleAC(todolistId, title))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}