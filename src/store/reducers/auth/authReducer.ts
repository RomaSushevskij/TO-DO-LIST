import {AppThunk} from '../../store';
import {setAppStatusAC} from '../app/appReducer';
import {authAPI, LoginPayloadDataType, RESULT_CODES} from '../../../api/todolist-api';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {resetTodolistsDataAC} from '../todolists/todolistReducer';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Dispatch} from 'redux';


const initialState = {
    isLoggedIn: false
};
const slice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action:PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});
export type AuthInitialStateType = typeof initialState;
export const {setIsLoggedIn} = slice.actions;
export const authReducer = slice.reducer;
// T H U N K S
export const login = (data: Omit<LoginPayloadDataType, 'captcha'>) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((data) => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(slice.actions.setIsLoggedIn({isLoggedIn: true}))
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
};
export const logout = () => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC('idle'))
    authAPI.logout()
        .then(data => {
            if (data.resultCode === RESULT_CODES.success) {
                dispatch(slice.actions.setIsLoggedIn({isLoggedIn:false}))
                dispatch(resetTodolistsDataAC())
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
};

