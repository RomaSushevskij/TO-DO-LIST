import {AppStateType} from '../store';

export const getTodolists = (state: AppStateType) => state.todolists;
export const getCurrentTodolist = (state: AppStateType, todolistID:string) => state.todolists.filter(({id}) => id === todolistID)[0];