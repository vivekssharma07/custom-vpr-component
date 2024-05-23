import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckboxComponent } from './index';

const mockHandleChange = jest.fn();

const mockParam = {
  parameter: {
    parameterName: 'testParameter'
  },
  values: [
    {
      parameterValue: 'opt1',
      displayName: 'Option 1',
      isSelected: false
    },
    {
      parameterValue: 'opt2',
      displayName: 'Option 2',
      isSelected: true
    }
  ]
};

afterEach(cleanup);

describe('CheckboxComponent', () => {
  test('renders correctly with provided param', () => {
    render(<CheckboxComponent param={mockParam} handleChange={mockHandleChange} />);

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    expect(option1).toBeInTheDocument();
    expect(option1).not.toBeChecked();

    expect(option2).toBeInTheDocument();
    expect(option2).toBeChecked();
  });

  test('calls handleChange when a checkbox is clicked', () => {
    render(<CheckboxComponent param={mockParam} handleChange={mockHandleChange} />);

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    // Simulate clicking the first checkbox
    fireEvent.click(option1);
    expect(mockHandleChange).toHaveBeenCalledWith('testParameter', 'opt1');

    // Simulate clicking the second checkbox
    fireEvent.click(option2);
    expect(mockHandleChange).toHaveBeenCalledWith('testParameter', 'opt2');
  });
});
