import {RESULT_CODES, todolistAPI, TodolistResponseType} from "../../../api/todolist-api";
import {AppDispatch} from '../../store';
import {RequestStatusType, setAppStatus} from '../app/appReducer';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {getTasks} from '../tasks/tasksReducer';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistType = TodolistResponseType & {
    filter: FilterValueType
    entityStatus: RequestStatusType,
}

// T H U N K S

export const getToDoLists = createAsyncThunk('todolists/getToDoLists', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.getTodolists();
        data.forEach((todolist => {
            dispatch(getTasks(todolist.id))
        }));
        return {todolists: data}
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});


export const createTodolist = createAsyncThunk('todolists/createTodolist', async (title: string, {dispatch, rejectWithValue})=>{
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.createTodolist(title);
        if (data.resultCode === RESULT_CODES.success) {
            return {todolist: data.data.item}
        } else {
            handleServerAppError(dispatch, data)
            return rejectWithValue(null)
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});

export const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {dispatch, rejectWithValue})=> {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeToDoListsEntityStatus({todolistId: todolistId, entityStatus: 'loading'}));
        const data = await todolistAPI.deleteTodolist(todolistId);
        if (data.resultCode === RESULT_CODES.success) {
            return {todolistID: todolistId}
        } else {
            handleServerAppError(dispatch, data);
            return rejectWithValue(null)
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch(changeToDoListsEntityStatus({todolistId: todolistId, entityStatus: 'succeeded'}))
    }
});

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle', async (params: {todolistId: string, title: string}, {dispatch, rejectWithValue})=> {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.updateTodolist(params.todolistId, params.title);
        if (data.resultCode === RESULT_CODES.success) {
            return {todolistID: params.todolistId, newTitle: params.title}
        } else {
            handleServerAppError(dispatch, data);
            return rejectWithValue(null)
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});

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
        changeToDoListsEntityStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistId);
            if (todoIndex > -1) {
                state[todoIndex].entityStatus = action.payload.entityStatus;
            }
        },
        resetTodolistsData() {
            return [];
        },
    },
    extraReducers: builder=>{
        builder.addCase(getToDoLists.fulfilled, (state, action)=> {
            return action.payload.todolists.map(td => ({...td, filter: 'All', entityStatus: 'idle'}));
        });
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "All", entityStatus: 'idle'});
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistID);
            if (todoIndex > -1) {
                state.splice(todoIndex, 1);
            }
        });
        builder.addCase(updateTodolistTitle.fulfilled, (state, action)=>{
            const todoIndex = state.findIndex(td => td.id === action.payload.todolistID);
            if (todoIndex > -1) {
                state[todoIndex].title = action.payload.newTitle;
            }
        });
    }

});
export const todolistsReducer = slice.reducer;
export const {
    changeFilter,
    changeToDoListsEntityStatus,
    resetTodolistsData
} = slice.actions;


