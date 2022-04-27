import {AppThunk} from '../../store';
import {setAppStatusAC} from '../app/appReducer';
import {authAPI, LoginPayloadDataType, RESULT_CODES} from '../../../api/todolist-api';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';

export enum AUTH_ACTIONS_TYPES {
    SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN'
}

const initialState = {
    isLoggedIn: false
}
export type AuthInitialStateType = typeof initialState

export const authReducer = (state: AuthInitialStateType = initialState, action: GeneralAuthACType): AuthInitialStateType => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
};


export type GeneralAuthACType =
    |ReturnType<typeof setIsLoggedInAC>


// A C T I O N S
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN,
    payload: {isLoggedIn}
} as const);


// T H U N K S
export const login = (data: Omit<LoginPayloadDataType, 'captcha'>): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((data) => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const logout = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('idle'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(setIsLoggedInAC(false))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

