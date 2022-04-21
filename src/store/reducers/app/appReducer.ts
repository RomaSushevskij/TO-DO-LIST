import {NullableType} from '../../store';

enum APP_ACTIONS_TYPES {
    SET_APP_STATUS = 'APP/SET_STATUS',
    SET_APP_ERROR_MESSAGE = 'APP/SET_ERROR_MESSAGE'
}

const initialAppState = {
    status: 'idle' as RequestStatusType,
    errorMessage: null as NullableType<string>
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: GeneralAppActionsType): InitialAppStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_STATUS:
        case APP_ACTIONS_TYPES.SET_APP_ERROR_MESSAGE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_APP_STATUS,
    payload: {status}
} as const)
export const setAppErrorMessageAC = (errorMessage: NullableType<string>) => ({
    type: APP_ACTIONS_TYPES.SET_APP_ERROR_MESSAGE,
    payload: {errorMessage}
} as const)


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = typeof initialAppState
export type  GeneralAppActionsType =
    |ReturnType<typeof setAppStatusAC>
    |ReturnType<typeof setAppErrorMessageAC>