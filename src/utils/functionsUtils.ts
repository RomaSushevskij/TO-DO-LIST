import {TaskType} from '../api/todolist-api';

export const sortTask = (task_1:TaskType, task_2:TaskType) => {
    if (task_1.order > task_2.order) {
        return 1
    }
    if (task_1.order < task_2.order) {
        return -1
    }
    return 0
};