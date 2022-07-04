import {addTask, changeTask, deleteTask, setTasks, tasksReducer, TasksType,} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolist-api";

let startState: TasksType

beforeEach(() => {
    startState = {
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
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = deleteTask({todolistID: "todolistId2", id: "2"});

    const endState: TasksType = tasksReducer(startState, action)

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
    const action = addTask({task: newTask});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTask({todolistId: "todolistId2", taskId: "2", model: {status: TaskStatuses.New}});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
});

test('title of specified task should be changed', () => {

    const action = changeTask({todolistId: "todolistId2", taskId: "2", model: {title: 'new title'}});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS")
    expect(endState["todolistId2"][1].title).toBe('new title')
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
    const endState = tasksReducer(startState, setTasks({todolistID: "todolistId1", tasks}))

    expect(endState).toStrictEqual({...startState, "todolistId1": tasks})


});

