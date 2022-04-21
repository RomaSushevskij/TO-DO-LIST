import {Provider} from "react-redux";
import {AppStateType, NullableType} from "../../store/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../store/reducers/tasks/tasksReducer";
import {todolistsReducer} from "../../store/reducers/todolists/todolistReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer, RequestStatusType} from '../../store/reducers/app/appReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistID_1', title: 'What to learn', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistID_2', title: 'What to work', filter: 'All', entityStatus: 'idle', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistID_1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistID_1',
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task2',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistID_1',
            },
        ],
        ['todolistID_2']: [
            {
                id: v1(),
                title: 'Incubator',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: 'new task1',
                order: 1,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistID_2',
            },
            {
                id: v1(),
                title: 'EPAM',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: 'new task1',
                order: 1,
                priority: TaskPriorities.Middle,
                startDate: '',
                todoListId: 'todolistID_2',
            },
        ]
    },
    app: {
        status: 'idle' as RequestStatusType,
        errorMessage: null as NullableType<string>
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}