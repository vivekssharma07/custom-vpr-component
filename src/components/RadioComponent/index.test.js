import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RadioButtonComponent } from './index'; // Adjust the import based on your file structure

describe('RadioButtonComponent', () => {
  const mockHandleChange = jest.fn();
  const mockParam = {
    parameter: { parameterName: 'testParameter' },
    values: [
      { displayName: 'Option 1', parameterValue: 'opt1', isSelected: false },
      { displayName: 'Option 2', parameterValue: 'opt2', isSelected: true },
      { displayName: 'Option 3', parameterValue: 'opt3', isSelected: false }
    ]
  };

  test('renders radio buttons correctly', () => {
    render(<RadioButtonComponent param={mockParam} handleChange={mockHandleChange} />);

    // Check if all radio buttons are rendered
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();

    // Check if the correct radio button is selected
    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
    expect(screen.getByLabelText('Option 3')).not.toBeChecked();
  });

  test.skip('calls handleChange when a radio button is clicked', () => {
    render(<RadioButtonComponent param={mockParam} handleChange={mockHandleChange} />);

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    // Simulate clicking the first radio button
    fireEvent.click(option1);
    expect(mockHandleChange).toHaveBeenCalledWith('testParameter', 'opt1');

    // Simulate clicking the second radio button again
    fireEvent.click(option2);
    expect(mockHandleChange).toHaveBeenCalledWith('testParameter', 'opt2');
  });
});
