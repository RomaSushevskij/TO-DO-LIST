import {AddTodolistType, RemoveTodolistType, SetTodolistsType} from "../todolists/todolistReducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../../api/todolist-api";
import {AppThunk} from '../../store';

const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const SET_TASKS = 'SET_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

export type TasksType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: GeneralTasksACType): TasksType => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(task => task.id !== action.payload.id)
            }
        case 'UPDATE_TASK':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ?
                        {...task, ...action.payload.model} : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.payload.todolist.id]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistID]
            return stateCopy
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach(td => stateCopy[td.id] = [])
            return stateCopy
        }
        case 'SET_TASKS': {
            return {
                ...state,
                [action.payload.todolistID]: action.payload.tasks
            }
        }
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


// A C T I O N S
export const addTaskAC = (task: TaskType) => ({
    type: ADD_TASK,
    payload: {task}
} as const);
export const removeTaskAC = (todolistID: string, id: string) => ({
    type: REMOVE_TASK,
    payload: {todolistID, id}
} as const);
export const setTasksAC = (tasks: TaskType[], todolistID: string) => ({
    type: SET_TASKS,
    payload: {tasks, todolistID}
} as const);
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskDomainModelType) => ({
    type: UPDATE_TASK,
    payload: {todolistId, taskId, model}
} as const);

// T H U N K S
export const getTasks = (todolistID: string): AppThunk => (dispatch) => {
    todolistAPI.getTasks(todolistID)
        .then(data => {
            dispatch(setTasksAC(data.items, todolistID))
        })
}
export const removeTask = (todolistId: string, taskId: string): AppThunk => dispatch => {
    todolistAPI.removeTask(todolistId, taskId)
        .then(data => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTask = (todolistId: string, title: string): AppThunk => dispatch => {
    todolistAPI.createTask(todolistId, title)
        .then(data => {
            dispatch(addTaskAC(data.data.item))
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
        todolistAPI.updateTask(todolistId, taskId, modelStatus)
            .then(data => {
                dispatch(updateTaskAC(todolistId, taskId, model))
            })
    }
}