import {setAppStatus} from '../app/appReducer';
import {authAPI, FieldErrorType, LoginPayloadDataType, RESULT_CODES} from '../../../api/todolist-api';
import {AxiosError} from 'axios';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {resetTodolistsData} from '../todolists/todolistReducer';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthInitialStateType = typeof initialState;

// T H U N K S
export const login = createAsyncThunk<undefined, Omit<LoginPayloadDataType, 'captcha'>, { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('auth/login', async (params, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        const data = await authAPI.login(params);
        if (data.resultCode === RESULT_CODES.success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            handleServerAppError(dispatch, data);
            return rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus({status: 'idle'}));
        const data = await authAPI.logout();
        if (data.resultCode === RESULT_CODES.success) {
            dispatch(resetTodolistsData())
        } else {
            handleServerAppError(dispatch, data)
            return rejectWithValue(null)
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
});
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
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;
        })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
    }
});
export const {setIsLoggedIn} = slice.actions;
export const authReducer = slice.reducer;



