import {AppStateType} from '../store';

export const getTasksForCurrentTodolist = (state: AppStateType, todolistID: string) => state.tasks.tasksData[todolistID];
export const getCurrentTask = (state: AppStateType, todolistID:string, taskID:string) => state.tasks.tasksData[todolistID].filter(({id}) => id === taskID)[0];
export const getReplacementTask = (state:AppStateType) =>state.tasks.replacementTask;
