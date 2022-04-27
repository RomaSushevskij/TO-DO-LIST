import {
    appReducer,
    InitialAppStateType,
    RequestStatusType,
    setAppErrorMessageAC,
    setAppStatusAC,
    setIsInitializedAppAC
} from './appReducer';
import {NullableType} from '../../store';


let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle' as RequestStatusType,
        errorMessage: null as NullableType<string>,
        isInitialized:false
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
test('correct value of property isInitialized should be set to state', () => {
    const endState = appReducer(startState, setIsInitializedAppAC(true))
    expect(startState.isInitialized).toBeFalsy()
    expect(endState.isInitialized).toBeTruthy()
});
