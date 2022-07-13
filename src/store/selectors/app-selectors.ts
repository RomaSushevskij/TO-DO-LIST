import {AppStateType} from '../store';

export const getStatus = (state: AppStateType) => state.app.status;
export const getIsInitialized = (state: AppStateType) => state.app.isInitialized;
export const getAppErrorMessage = (state: AppStateType) => state.app.errorMessage;
