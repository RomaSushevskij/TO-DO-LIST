import {
    AddTodolistType,
    RemoveTodolistType, ResetTodolistsDataType,
    SetTodolistsType,
    TODOLISTS_ACTIONS_TYPES
} from "../todolists/todolistReducer";
import {RESULT_CODES, TaskType, todolistAPI, UpdateTaskModelType} from "../../../api/todolist-api";
import {AppThunk} from '../../store';
import {setAppStatusAC} from '../app/appReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';

export enum TASKS_ACTIONS_TYPES {
    ADD_TASK = 'TASK/ADD_TASK',
    REMOVE_TASK = 'TASK/REMOVE_TASK',
    SET_TASKS = 'TASK/SET_TASKS',
    UPDATE_TASK = 'TASK/UPDATE_TASK'
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: GeneralTasksACType): TasksType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPES.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case TASKS_ACTIONS_TYPES.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(task => task.id !== action.payload.id)
            }
        case TASKS_ACTIONS_TYPES.UPDATE_TASK:
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ?
                        {...task, ...action.payload.model} : task)
            }
        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return {
                ...state, [action.payload.todolist.id]: []
            }
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistID]
            return stateCopy
        case TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS: {
            const stateCopy = {...state}
            action.payload.todolists.forEach(td => stateCopy[td.id] = [])
            return stateCopy
        }
        case TASKS_ACTIONS_TYPES.SET_TASKS: {
            return {
                ...state,
                [action.payload.todolistID]: action.payload.tasks
            }
        }
        case TODOLISTS_ACTIONS_TYPES.RESET_TODOLISTS_DATA:
            return {}
        default:
            return state
    }
};

export type AddTaskType = ReturnType<typeof addTaskAC>
export type RemoveTaskType = ReturnType<typeof removeTaskAC>

export type GeneralTasksACType =
    | AddTaskType
    | RemoveTaskType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ResetTodolistsDataType


// A C T I O N S
export const addTaskAC = (task: TaskType) => ({
    type: TASKS_ACTIONS_TYPES.ADD_TASK,
    payload: {task}
} as const);
export const removeTaskAC = (todolistID: string, id: string) => ({
    type: TASKS_ACTIONS_TYPES.REMOVE_TASK,
    payload: {todolistID, id}
} as const);
export const setTasksAC = (tasks: TaskType[], todolistID: string) => ({
    type: TASKS_ACTIONS_TYPES.SET_TASKS,
    payload: {tasks, todolistID}
} as const);
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskDomainModelType) => ({
    type: TASKS_ACTIONS_TYPES.UPDATE_TASK,
    payload: {todolistId, taskId, model}
} as const);

// T H U N K S
export const getTasks = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistID)
        .then(data => {
            dispatch(setTasksAC(data.items, todolistID))
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTask = (todolistId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.removeTask(todolistId, taskId)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(removeTaskAC(todolistId, taskId))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTask = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(addTaskAC(data.data.item))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch(error => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
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
export const updateTask = (todolistId: string, taskId: string, model: UpdateTaskDomainModelType): AppThunk => (dispatch, getState) => {
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
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTask(todolistId, taskId, modelStatus)
            .then(data => {
                if (data.resultCode === RESULT_CODES.success) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                } else {
                    handleServerAppError(dispatch, data)
                }
            })
            .catch(error => {
                handleNetworkAppError(dispatch, error)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}