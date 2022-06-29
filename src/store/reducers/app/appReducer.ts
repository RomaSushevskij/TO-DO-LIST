import {AppThunk, NullableType} from '../../store';
import {authAPI, RESULT_CODES} from '../../../api/todolist-api';
import {setIsLoggedIn} from '../auth/authReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {AxiosError} from 'axios';

enum APP_ACTIONS_TYPES {
    SET_APP_STATUS = 'APP/SET_STATUS',
    SET_APP_ERROR_MESSAGE = 'APP/SET_ERROR_MESSAGE',
    SET_IS_INITIALIZED_APP = 'APP/SET_IS_INITIALIZED_APP'
}

const initialAppState = {
    status: 'idle' as RequestStatusType,
    errorMessage: null as NullableType<string>,
    isInitialized:false
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: GeneralAppActionsType): InitialAppStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_STATUS:
        case APP_ACTIONS_TYPES.SET_APP_ERROR_MESSAGE:
        case APP_ACTIONS_TYPES.SET_IS_INITIALIZED_APP:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

// A C T I O N S
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_APP_STATUS,
    payload: {status}
} as const)
export const setAppErrorMessageAC = (errorMessage: NullableType<string>) => ({
    type: APP_ACTIONS_TYPES.SET_APP_ERROR_MESSAGE,
    payload: {errorMessage}
} as const)
export const setIsInitializedAppAC = (isInitialized: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_IS_INITIALIZED_APP,
    payload: {isInitialized}
} as const)

// T H U N K S
export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(setIsLoggedIn({isLoggedIn:true}))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(()=>{
            dispatch(setIsInitializedAppAC(true))
        })
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = typeof initialAppState
export type  GeneralAppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorMessageAC>
    | ReturnType<typeof setIsInitializedAppAC>