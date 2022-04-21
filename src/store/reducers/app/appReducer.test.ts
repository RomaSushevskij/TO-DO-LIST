import {appReducer, InitialAppStateType, RequestStatusType, setAppErrorMessageAC, setAppStatusAC} from './appReducer';
import {NullableType} from '../../store';


let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle' as RequestStatusType,
        errorMessage: null as NullableType<string>
    }
})

test('correct status should be set to state', () => {
    const newStatusValue = 'loading'
    const endState = appReducer(startState, setAppStatusAC(newStatusValue))
    expect(endState.status).toBe(newStatusValue)
});
test('correct error message should be set to state', () => {
    const newErrorMessage = 'some error occurred'
    const endState = appReducer(startState, setAppErrorMessageAC(newErrorMessage))
    expect(endState.errorMessage).toBe(newErrorMessage)
});
