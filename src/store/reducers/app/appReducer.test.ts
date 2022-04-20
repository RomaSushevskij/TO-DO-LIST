import {removeTaskAC, tasksReducer, TasksType} from '../tasks/tasksReducer';
import {appReducer, InitialAppStateType, RequestStatusType, setAppStatusAC} from './appReducer';
import {TaskPriorities, TaskStatuses} from '../../../api/todolist-api';
import {start} from 'repl';


let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle' as RequestStatusType
    }
})

test('correct status should be set from to state', () => {
    const newStatusValue = 'loading'
    const endState = appReducer(startState, setAppStatusAC(newStatusValue))
    expect(endState.status).toBe(newStatusValue)
});