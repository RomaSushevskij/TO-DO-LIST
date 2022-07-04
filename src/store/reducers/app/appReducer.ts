import {AppDispatch, NullableType} from '../../store';
import {authAPI, RESULT_CODES} from '../../../api/todolist-api';
import {setIsLoggedIn} from '../auth/authReducer';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialAppState = {
    status: 'idle' as RequestStatusType,
    errorMessage: null as NullableType<string>,
    isInitialized: false
};

const slice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorMessage(state, action: PayloadAction<{ errorMessage: NullableType<string> }>) {
            state.errorMessage = action.payload.errorMessage;
        },
        setIsInitializedApp(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
    }
});
export const appReducer = slice.reducer;
export const {setAppStatus, setAppErrorMessage, setIsInitializedApp} = slice.actions;


// T H U N K S
export const initializeApp = () => (dispatch: AppDispatch) => {
    authAPI.me()
        .then(data => {
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
            dispatch(setIsInitializedApp({isInitialized: true}))
        })
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialAppStateType = typeof initialAppState;