import {createTodolist, getToDoLists, removeTodolist, resetTodolistsData} from "../todolists/todolistReducer";
import {RESULT_CODES, TaskType, todolistAPI, UpdateTaskModelType} from "../../../api/todolist-api";
import {AppStateType} from '../../store';
import {setAppStatus} from '../app/appReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
        const currentTask = state.tasks.tasksData[params.todolistId].find(task => task.id === params.taskId);
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
});

export const reorderTask = createAsyncThunk('tasks/reorderTask', async (params: { todolistId: string, draggableTaskIndex: number, replaceableTaskIndex: number | undefined, draggableTaskId: string }, {dispatch, rejectWithValue, getState}) => {
    try {
        const state = getState() as AppStateType;
        if (params.replaceableTaskIndex !== undefined) {
            const replaceableTaskIndex = params.draggableTaskIndex > params.replaceableTaskIndex ?
                params.replaceableTaskIndex - 1 : params.replaceableTaskIndex;
            const replaceableTaskId = params.replaceableTaskIndex > 0 ? state.tasks.tasksData[params.todolistId][replaceableTaskIndex].id : null;
            dispatch(setAppStatus({status: 'loading'}));
            dispatch(setReorderedTask({
                todolistId: params.todolistId,
                draggableTaskIndex: params.draggableTaskIndex,
                replaceableTaskIndex: params.replaceableTaskIndex
            }));
            debugger
            const data = await todolistAPI.reorderTask(params.todolistId, params.draggableTaskId, replaceableTaskId);
            if (data.resultCode === RESULT_CODES.success) {
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null)
            }
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null);
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});

const initialState = {
    tasksData: {} as TasksType,
    replacementTask: {} as TaskType
};
export type InitialStateTasksType = typeof initialState;
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setReorderedTask(state, action: PayloadAction<{
            todolistId: string,
            draggableTaskIndex: number,
            replaceableTaskIndex: number
        }>) {
            const {todolistId, draggableTaskIndex, replaceableTaskIndex} = action.payload;
            const currentTasks = state.tasksData[todolistId];
            const [reorderedTask] = currentTasks.splice(draggableTaskIndex, 1);
            currentTasks.splice(replaceableTaskIndex, 0, reorderedTask);
        }
    },
    extraReducers(builder) {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.tasksData[action.payload.todolist.id] = [];
        })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state.tasksData[action.payload.todolistID];
            })
            .addCase(getToDoLists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state.tasksData[tl.id] = [])
            })
            .addCase(resetTodolistsData, (state) => {
                state.tasksData = {}
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasksData[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasksData[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state.tasksData[action.payload.todolistId];
                const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId);
                if (taskIndex > -1) {
                    tasks.splice(taskIndex, 1);
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (action.payload) {
                    const tasks = state.tasksData[action.payload.todolistId];
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
export const {setReorderedTask} = slice.actions;
