import {setAppErrorMessageAC} from '../store/reducers/app/appReducer';
import {Dispatch} from 'redux';
import {AppActionsType} from '../store/store';
import {ResponseType, TaskType, TodolistResponseType} from '../api/todolist-api';

export const handleNetworkAppError = (dispatch: Dispatch<AppActionsType>, error: { message: string }) => {
    dispatch(setAppErrorMessageAC(error.message ? error.message : 'Some error'))
}
export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    dispatch(setAppErrorMessageAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
}
