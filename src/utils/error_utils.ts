import {setAppErrorMessage} from '../store/reducers/app/appReducer';
import {ResponseType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export const handleNetworkAppError = (dispatch: Dispatch, error: { message: string }) => {
    const errorMessage = error.message ? error.message : 'Some error';
    dispatch(setAppErrorMessage({errorMessage}))
};
export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    const errorMessage = data.messages.length ? data.messages[0] : 'Some error occurred';
    dispatch(setAppErrorMessage({errorMessage}))
};
