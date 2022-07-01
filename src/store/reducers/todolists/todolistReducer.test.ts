import {v1} from "uuid";

import {
    addTodolist,
    changeFilter,
    deleteTodolist,
    setToDoLists,
    changeToDoListsEntityStatus,
    todolistsReducer,
    TodolistType,
    changeTodolistTitle, resetTodolistsData
} from "./todolistReducer";
import {tasksReducer, TasksType} from "../tasks/tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolist-api";

let todolistID_1: string;
let todolistID_2: string;
let startTodolistState: TodolistType[]
let startTasksState: TasksType

beforeEach(() => {
    todolistID_1 = v1();
    todolistID_2 = v1();
    startTodolistState = [
        {id: todolistID_1, title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistID_2, title: 'What to work', filter: 'All', entityStatus: 'idle', addedDate: '', order: 1}
    ]
    startTasksState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };
})

test('selected todolist should be removed', () => {

    const endState = todolistsReducer(startTodolistState, deleteTodolist(todolistID_1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID_2)
})

test('should be added new todolist', () => {

    const todolistID = v1()
    const title = 'Technologies'
    const newTodolist = {id: v1(), title: 'new todolist', addedDate: '', order: 0}
    const endState = todolistsReducer(startTodolistState, addTodolist(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
})

test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startTodolistState, changeFilter(todolistID_2, 'Active'));

    expect(endState[1].filter).toBe('Active')
    expect(endState[0].filter).toBe('All')
})

test('correct todolist should be change it\'s name', () => {

    const endState = todolistsReducer(startTodolistState, changeTodolistTitle(todolistID_1, 'New tasks'))

    expect(endState[1].title).toBe('What to work')
    expect(endState[0].title).toBe('New tasks')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };
    const newTodolist = {id: v1(), title: "new todolist", addedDate: '', order: 0}

    const action = addTodolist(newTodolist);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];
    const todolistID = v1()
    const newTodolist = {id: todolistID, title: "new todolist", addedDate: '', order: 0}
    const action = addTodolist(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };

    const action = deleteTodolist("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('current todolists should be added to state', () => {
    const todoId_1 = v1()
    const todoId_2 = v1()
    const currentTodolists = [
        {id: todoId_1, title: 'Todos 1', addedDate: '', order: 0},
        {id: todoId_2, title: 'Todos 2', addedDate: '', order: 1}
    ]
    const currentTodolistsRes = [
        {id: todoId_1, title: 'Todos 1', addedDate: '', order: 0, filter: 'All', entityStatus: 'idle'},
        {id: todoId_2, title: 'Todos 2', addedDate: '', order: 1, filter: 'All', entityStatus: 'idle'}
    ]

    const endTodolistState = todolistsReducer(startTodolistState, setToDoLists(currentTodolists))
    const endTasksState = tasksReducer(startTasksState, setToDoLists(currentTodolists))

    expect(endTodolistState).toEqual(currentTodolistsRes)
    expect(endTasksState).toEqual({...startTasksState, [todoId_1]: [], [todoId_2]: []})
})
test('correct entityStatus of todolist should be changed', () => {

    const endTodolistState = todolistsReducer(startTodolistState, changeToDoListsEntityStatus(todolistID_1, 'loading'));
    expect(endTodolistState[0].entityStatus).toBe('loading')
    expect(endTodolistState[1].entityStatus).toBe('idle')
})
test('data of todolists should be reset after logout', () => {
    const endTodolistState = todolistsReducer(startTodolistState, resetTodolistsData())
    const endTasksState = tasksReducer(startTasksState, resetTodolistsData())
    expect(endTodolistState).toStrictEqual([])
    expect(endTasksState).toStrictEqual({})
})



