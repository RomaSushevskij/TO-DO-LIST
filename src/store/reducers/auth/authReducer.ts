import {setAppStatus} from '../app/appReducer';
import {authAPI, LoginPayloadDataType, RESULT_CODES} from '../../../api/todolist-api';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {resetTodolistsDataAC} from '../todolists/todolistReducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from 'redux';
import {AppDispatch} from '../../store';


const initialState = {
    isLoggedIn: false
};
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});

export const {setIsLoggedIn} = slice.actions;
export const authReducer = slice.reducer;

// T H U N K S
export const login = (data: Omit<LoginPayloadDataType, 'captcha'>) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then((data) => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        })
};
export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'idle'}))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(setIsLoggedIn({isLoggedIn: false}))
                dispatch(resetTodolistsDataAC())
            } else {
                handleServerAppError(dispatch, data)
            }
        })
        .catch((error: AxiosError) => {
            handleNetworkAppError(dispatch, error)
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        })
};


export type AuthInitialStateType = typeof initialState;
