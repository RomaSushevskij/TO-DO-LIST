enum APP_ACTIONS_TYPES {
    SET_STATUS = 'APP/SET_STATUS'
}

const initialAppState = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: GeneralAppActionsType): InitialAppStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_STATUS:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_STATUS,
    payload: {status}
} as const)


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = typeof initialAppState
export type  GeneralAppActionsType =
    |ReturnType<typeof setAppStatusAC>