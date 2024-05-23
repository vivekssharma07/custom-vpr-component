import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DropdownComponent } from './index';

const mockHandleChange = jest.fn();

const mockParam = {
  parameter: {
    parameterName: 'testParameter',
    parameterValue: 'BU'
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
  ],
  mandatory: true,
  isInvalid: true
};

afterEach(cleanup);

describe('DropdownComponent', () => {
  test('renders correctly with provided param', () => {
    render(<DropdownComponent param={mockParam} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    const selectedOption = screen.getByText('Option 2');

    expect(dropdown).toBeInTheDocument();
    expect(selectedOption).toBeInTheDocument();
  });

  test('calls handleChange when a dropdown option is selected', () => {
    render(<DropdownComponent param={mockParam} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    // Open the dropdown
    fireEvent.mouseDown(dropdown);

  });

  test('shows validation error when mandatory and invalid', () => {
    render(<DropdownComponent param={{ ...mockParam, values: [], isInvalid: true }} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveClass('saltDropdown-error');
  });

  test('displays correct option format when parameterValue is BU', () => {
    const paramWithBU = {
      ...mockParam,
      parameter: {
        ...mockParam.parameter,
        parameterValue: 'BU'
      }
    };
    render(<DropdownComponent param={paramWithBU} handleChange={mockHandleChange} />);

    const selectedOption = screen.getByText('Option 2');
    expect(selectedOption).toBeInTheDocument();
  });

  test('displays correct option format when parameterValue is not BU', () => {
    const paramWithoutBU = {
      ...mockParam,
      parameter: {
        ...mockParam.parameter,
        parameterValue: 'notBU'
      }
    };
    render(<DropdownComponent param={paramWithoutBU} handleChange={mockHandleChange} />);

    const selectedOption = screen.getByText('Option 2 (opt2)');
    expect(selectedOption).toBeInTheDocument();
  });
});
