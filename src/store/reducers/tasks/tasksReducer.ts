import {createTodolist, getToDoLists, removeTodolist, resetTodolistsData} from "../todolists/todolistReducer";
import {RESULT_CODES, TaskType, todolistAPI, UpdateTaskModelType} from "../../../api/todolist-api";
import {AppStateType} from '../../store';
import {setAppStatus} from '../app/appReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export type TasksType = {
    [key: string]: Array<TaskType>
}
export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

// T H U N K S
export const getTasks = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.getTasks(todolistId);
        return {tasks: data.items, todolistId}
    } catch (err) {
        const error = err as AxiosError;
        handleNetworkAppError(thunkAPI.dispatch, error);
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    }
});

export const createTask = createAsyncThunk('tasks/createTask', async (params: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.createTask(params.todolistId, params.title)
        if (data.resultCode === RESULT_CODES.success) {
            return {task: data.data.item}
        } else {
            handleServerAppError(dispatch, data)
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

export const removeTask = createAsyncThunk('tasks/removeTask', async (params: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.removeTask(params.todolistId, params.taskId);
        if (data.resultCode === RESULT_CODES.success) {
            return {todolistId: params.todolistId, taskId: params.taskId}
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

export const updateTask = createAsyncThunk('tasks/updateTask', async (params: { todolistId: string, taskId: string, model: UpdateTaskDomainModelType }, {dispatch, rejectWithValue, getState}) => {
        const state = getState() as AppStateType;
        try {
            const currentTask = state.tasks[params.todolistId].find(task => task.id === params.taskId);
            if (currentTask) {
                const modelStatus: UpdateTaskModelType = {
                    deadline: currentTask.deadline,
                    description: currentTask.description,
                    priority: currentTask.priority,
                    startDate: currentTask.startDate,
                    status: currentTask.status,
                    title: currentTask.title,
                    ...params.model
                };
                dispatch(setAppStatus({status: 'loading'}))
                const data = await todolistAPI.updateTask(params.todolistId, params.taskId, modelStatus);
                if (data.resultCode === RESULT_CODES.success) {
                    return {todolistId: params.todolistId, taskId: params.taskId, model: params.model}
                } else {
                    handleServerAppError(dispatch, data);
                    return rejectWithValue(null)
                }
            }
        } catch (e) {
            const error = e as AxiosError;
            handleNetworkAppError(dispatch, error)
            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus({status: 'succeeded'}))
        }
    })
;

const initialState: TasksType = {};
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistID];
        });
        builder.addCase(getToDoLists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        });
        builder.addCase(resetTodolistsData, () => {
            return {}
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
            }
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId];
                const taskIndex = tasks.findIndex(task => {
                    if (action.payload) {
                        return task.id === action.payload.taskId
                    }
                });
                if (taskIndex > -1) {
                    tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.model};
                }
            }

        })
    }

});
export const tasksReducer = slice.reducer;
