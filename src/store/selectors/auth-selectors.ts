import {AppStateType} from '../store';

export const getIsLoggedIn = (state: AppStateType) => state.auth.isLoggedIn;