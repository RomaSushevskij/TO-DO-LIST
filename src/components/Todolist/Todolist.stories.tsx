import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';


export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator,],
} as ComponentMeta<typeof Todolist>;


const Template: ComponentStory<typeof Todolist> = (args) => {
    return (
        <Todolist {...args}/>
    )
}


export const TodolistAllTasksExample = Template.bind({});
TodolistAllTasksExample.args = {
    todolistID: 'todolistID_1',
};


