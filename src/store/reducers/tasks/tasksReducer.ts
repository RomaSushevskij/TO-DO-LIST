import {addTodolist, deleteTodolist, resetTodolistsData, setToDoLists,} from "../todolists/todolistReducer";
import {RESULT_CODES, TaskType, todolistAPI, UpdateTaskModelType} from "../../../api/todolist-api";
import {AppDispatch, AppGetState} from '../../store';
import {setAppStatus} from '../app/appReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export type TasksType = {
    [key: string]: Array<TaskType>
}


export const getTasks = createAsyncThunk('tasks/getTasks', async (todolistID: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
        const data = await todolistAPI.getTasks(todolistID)
        return {tasks: data.items, todolistID}
    } catch (err) {
        const error = err as AxiosError;
        handleNetworkAppError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue(error)
    } finally {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    }
});

const initialState: TasksType = {};
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        deleteTask(state, action: PayloadAction<{ todolistID: string, id: string }>) {
            const tasks = state[action.payload.todolistID]
            const taskIndex = tasks.findIndex(task => task.id === action.payload.id);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
            }
        },
        changeTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskDomainModelType }>) {
            const tasks = state[action.payload.todolistId];
            const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId);
            if (taskIndex > -1) {
                tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.model};
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolist, (state, action) => {
            delete state[action.payload.todolistID];
        });
        builder.addCase(setToDoLists, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        });
        builder.addCase(resetTodolistsData, () => {
            return {}
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks
        })
    }

});
export const tasksReducer = slice.reducer;
export const {addTask, changeTask, deleteTask} = slice.actions;

// T H U N K S
export const removeTask = (todolistId: string, taskId: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.removeTask(todolistId, taskId)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(deleteTask({todolistID: todolistId, id: taskId}))
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
export const createTask = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(addTask({task: data.data.item}))
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

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTask = (todolistId: string, taskId: string, model: UpdateTaskDomainModelType) => (dispatch: AppDispatch, getState: AppGetState) => {
    const currentTask = getState().tasks[todolistId].find(task => task.id === taskId)
    if (currentTask) {
        const modelStatus: UpdateTaskModelType = {
            deadline: currentTask.deadline,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            status: currentTask.status,
            title: currentTask.title,
            ...model
        }
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.updateTask(todolistId, taskId, modelStatus)
            .then(data => {
                if (data.resultCode === RESULT_CODES.success) {
                    dispatch(changeTask({todolistId, taskId, model}))
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
}