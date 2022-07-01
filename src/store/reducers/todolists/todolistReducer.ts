import {RESULT_CODES, todolistAPI, TodolistResponseType} from "../../../api/todolist-api";
import {AppDispatch} from '../../store';
import {RequestStatusType, setAppStatus} from '../app/appReducer';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {getTasks} from '../tasks/tasksReducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<{ todolistID: string, filterType: FilterValueType }>) {
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistID);
            if (todoIndex > -1) {
                state[todoIndex].filter = action.payload.filterType;
            }
        },
        deleteTodolist(state, action: PayloadAction<{ todolistID: string }>) {
            const todoIndex = state.findIndex(td => td.id !== action.payload.todolistID);
            if (todoIndex > -1) {
                state.splice(todoIndex, 1);
            }
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistResponseType }>) {
            state.unshift({...action.payload.todolist, filter: "All", entityStatus: 'idle'});
        },
        changeTodolistTitle(state, action: PayloadAction<{ todolistID: string, newTitle: string }>) {
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistID);
            if (todoIndex > -1) {
                state[todoIndex].title = action.payload.newTitle;
            }
        },
        setToDoLists(state, action: PayloadAction<{ todolists: TodolistResponseType[] }>) {
            return action.payload.todolists.map(td => ({...td, filter: 'All', entityStatus: 'idle'}));
        },
        changeToDoListsEntityStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistId);
            if (todoIndex > -1) {
                state[todoIndex].entityStatus = action.payload.entityStatus;
            }
        },
        resetTodolistsData(state) {
            return [];
        },
    },
});
export const todolistsReducer = slice.reducer;
export const {changeFilter,
    deleteTodolist,
    addTodolist,
    changeTodolistTitle,
    setToDoLists,
    changeToDoListsEntityStatus,
    resetTodolistsData} = slice.actions;
export type AddTodolistType = ReturnType<typeof  addTodolist>
export type RemoveTodolistType = ReturnType<typeof deleteTodolist>
export type SetTodolistsType = ReturnType<typeof setToDoLists>
export type ResetTodolistsDataType = ReturnType<typeof resetTodolistsData>



// T H U N K S
export const getToDoLists = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    todolistAPI.getTodolists()
        .then(data => {
            dispatch(setToDoLists({todolists:data}))
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
                dispatch(addTodolist({todolist:data.data.item}))
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
    dispatch(changeToDoListsEntityStatus({todolistId:todolistId, entityStatus:'loading'}, ))
    todolistAPI.deleteTodolist(todolistId)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(deleteTodolist({todolistID:todolistId}))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeToDoListsEntityStatus({todolistId: todolistId, entityStatus:'succeeded'}))
        })
}
export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolist(todolistId, title)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(changeTodolistTitle({todolistID:todolistId, newTitle:title}, ))
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