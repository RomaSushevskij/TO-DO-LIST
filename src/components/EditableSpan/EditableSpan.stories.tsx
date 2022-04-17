import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            description: 'title of span',
            defaultValue: 'Span title',
        },
        updateTitle: {
            description: 'callback for changing items title'
        },
        labelInput: {
            description: 'label of input',
            defaultValue: 'Input label',
        },
    },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: 'Some task',
    updateTitle: action('tasks title was updated'),
    labelInput: 'Tasks title',
};


