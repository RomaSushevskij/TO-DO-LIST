import {NullableType} from '../../store';
import {authAPI, RESULT_CODES} from '../../../api/todolist-api';
import {handleNetworkAppError, handleServerAppError} from '../../../utils/error_utils';
import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedIn} from '../auth/authReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialAppStateType = typeof initialAppState;

// T H U N K S
export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch, rejectWithValue}) => {
    try {
        const data = await authAPI.me();
        if (data.resultCode === RESULT_CODES.success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        } else {
            handleServerAppError(dispatch, data);
            return rejectWithValue(null)
        }
    } catch (e) {
        const error = e as AxiosError;
        handleNetworkAppError(dispatch, error);
        return rejectWithValue(null)
    } finally {

    }
});

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
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, state => {
            state.isInitialized = true;
        });
        builder.addCase(initializeApp.rejected, state => {
            state.isInitialized = true;
        });
    }
});

export const appReducer = slice.reducer;
export const {setAppStatus, setAppErrorMessage} = slice.actions;


