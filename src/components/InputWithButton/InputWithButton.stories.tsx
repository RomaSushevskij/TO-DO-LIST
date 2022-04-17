import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {InputWithButton} from "./InputWithButton";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/InputWithButton',
    component: InputWithButton,
    argTypes: {
        buttonName: {
            defaultValue: '+'
        },
        addItem: {
            description: 'callback for adding item'
        },
        inputLabel: {
            defaultValue: 'title of element'
        },
    },
} as ComponentMeta<typeof InputWithButton>;


const Template: ComponentStory<typeof InputWithButton> = (args) => <InputWithButton {...args} />;

export const AddTasksInputWithButton = Template.bind({});
AddTasksInputWithButton.args = {
    addItem: action(`was added task this title`),
    inputLabel: 'Tasks title'
};

