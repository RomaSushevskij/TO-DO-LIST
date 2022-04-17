import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from './App';
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/AppWithRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator,],
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App/>


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};
