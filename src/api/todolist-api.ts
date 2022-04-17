import axios, {AxiosResponse} from "axios";

export type TodolistResponseType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export enum TaskStatuses {
    New,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}

type GetTasksResponse = {
    error: string | null
    items: TaskType []
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


const todoInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "10732160-f45a-4879-8e6f-b2819bc13c24"
    }
})


export const todolistAPI = {
    getTodolists() {
        return todoInstance.get<TodolistResponseType[]>('todo-lists')
            .then(response => {
                return response.data
            })
    },
    createTodolist(title: string) {
        return todoInstance.post<any, AxiosResponse<ResponseType<{ item: TodolistResponseType }>>, { title: string }>('todo-lists', {title})
            .then(response => {
                return response.data
            })
    },
    deleteTodolist(todolistId: string) {
        return todoInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then(response => {
                return response.data
            })
    },
    updateTodolist(todolistId: string, title: string) {
        return todoInstance.put<any, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title})
            .then(response => {
                return response.data
            })
    },
    getTasks(todolistId: string) {
        return todoInstance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
            .then(response => {
                return response.data
            })
    },
    createTask(todolistId: string, title: string) {
        return todoInstance.post<any, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, {title})
            .then(response => {
                return response.data
            })
    },
    removeTask(todolistId: string, taskId: string) {
        return todoInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => {
                return response.data
            })
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return todoInstance.put<any, AxiosResponse<ResponseType<TaskType>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then(response => {
                return response.data
            })
    }
}