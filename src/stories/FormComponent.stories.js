import { fn } from '@storybook/test';
//import { FormComponent } from '../components/FormComponent/index';
import MyForm from './MyForm'

export default {
  title: 'Example/MyForm',
  component: MyForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    primary: true,
    label: 'MyForm',
  },
};

export const Secondary = {
  args: {
    label: 'MyForm',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'MyForm',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'MyForm',
  },
};


