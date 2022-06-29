import {AuthInitialStateType, authReducer, setIsLoggedIn,} from "./authReducer";

let startState: AuthInitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn:false
    };
})

test('correct value of isLoggedIn should be set to state', () => {
    const endState = authReducer(startState, setIsLoggedIn({isLoggedIn:true}))
    expect(endState.isLoggedIn).toBe(true)
});
