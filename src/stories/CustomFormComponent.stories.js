import { fn } from '@storybook/test';
import {Form} from './Form'
import {SecondaryForm} from './SecondaryForm'

export default {
  title: 'Example/Form',
  component: Form,
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
    label: 'Form',
  },
};

export const BaseStory = () => (
  <>
    <SecondaryForm />
  </>
);


