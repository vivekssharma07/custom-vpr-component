import { fn } from '@storybook/test';
import DynamicForm from './DynamicForm'

export default {
  title: 'Example/DynamicForm',
  component: DynamicForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {action:'clicked'}
  },
  argT: { onClick: fn() },
};

export const Primary = {
  args: {
    primary: true,
    label: 'DynamicForm',
  },
};

export const Secondary = {
  args: {
    label: 'DynamicForm',
  },
};



