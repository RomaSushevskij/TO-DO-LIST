import {
    createTask,
    getTasks,
    InitialStateTasksType,
    removeTask,
    tasksReducer,
    TasksType,
    updateTask,
} from "./tasksReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/todolist-api";

let startState: InitialStateTasksType

beforeEach(() => {
    startState = {
        tasksData: {
            "todolistId1": [
                {
                    id: "1", title: "CSS", status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    description: 'new task',
                    order: 1,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: 'todolistId1',
                },
                {
                    id: "2", title: "JS", status: TaskStatuses.Completed,
                    addedDate: '',
                    deadline: '',
                    description: 'new task',
                    order: 1,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: 'todolistId1',
                },
                {
                    id: "3", title: "React", status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    description: 'new task',
                    order: 1,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: 'todolistId1',
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
                    todoListId: 'todolistId2',
                },
                {
                    id: "2", title: "milk", status: TaskStatuses.Completed,
                    addedDate: '',
                    deadline: '',
                    description: 'new task',
                    order: 1,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: 'todolistId2',
                },
                {
                    id: "3", title: "tea", status: TaskStatuses.New,
                    addedDate: '',
                    deadline: '',
                    description: 'new task',
                    order: 1,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    todoListId: 'todolistId2',
                }
            ],
        },
        replacementTask: {} as TaskType
    }
})

test('correct task should be deleted from correct array', () => {

    const payload = {todolistId: "todolistId2", taskId: "2"};
    const action = removeTask.fulfilled(payload, 'requestId', payload);

    const endState: InitialStateTasksType = tasksReducer(startState, action)

    expect(endState).toEqual({
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
    });
});

test('correct task should be added to correct array', () => {
    const newTask = {
        id: "3", title: "juce", status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: 'new task',
        order: 1,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: 'todolistId2',
    }
    const payload = {task: newTask};
    const action = createTask.fulfilled(payload, 'requestId', {todolistId: newTask.todoListId, title: newTask.title});

    const endState = tasksReducer(startState, action)

    expect(endState.tasksData["todolistId1"].length).toBe(3);
    expect(endState.tasksData["todolistId2"].length).toBe(4);
    expect(endState.tasksData["todolistId2"][0].id).toBeDefined();
    expect(endState.tasksData["todolistId2"][0].title).toBe("juce");
    expect(endState.tasksData["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const payload = {todolistId: "todolistId2", taskId: "2", model: {status: TaskStatuses.New}};
    const action = updateTask.fulfilled(payload, 'requestId', payload);

    const endState = tasksReducer(startState, action)

    expect(endState.tasksData["todolistId1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState.tasksData["todolistId2"][1].status).toBe(TaskStatuses.New)
});

test('title of specified task should be changed', () => {

    const payload = {todolistId: "todolistId2", taskId: "2", model: {title: 'new title'}};
    const action = updateTask.fulfilled(payload, 'requestId', payload);

    const endState = tasksReducer(startState, action)

    expect(endState.tasksData["todolistId1"][1].title).toBe("JS")
    expect(endState.tasksData["todolistId2"][1].title).toBe('new title')
});
test('tasks for current todolist should be added to state', () => {
    const tasks = [
        {
            id: "45", title: "NewTask", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: 'new task',
            order: 1,
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: "todolistId1",
        }
    ]
    const endState = tasksReducer(startState, getTasks.fulfilled({
        todolistId: "todolistId1",
        tasks
    }, 'requestGetTasksID', "todolistId1"))

    expect(endState).toStrictEqual({...startState, "todolistId1": tasks})


});

