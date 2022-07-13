import {AppStateType} from '../store';

export const getTasksForCurrentTodolist = (state: AppStateType, todolistID: string) => state.tasks[todolistID];
export const getCurrentTask = (state: AppStateType, todolistID:string, taskID:string) => state.tasks[todolistID].filter(({id}) => id === taskID)[0];
