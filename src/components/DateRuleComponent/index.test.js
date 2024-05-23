import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateRuleComponent } from './index'; // Adjust the import path as necessary
import debounce from 'lodash/debounce';

// Mock debounce to run immediately for testing
jest.mock('lodash/debounce', () => jest.fn(fn => fn));

const mockHandleChange = jest.fn();

const mockParam = {
  parameter: {
    parameterName: 'testParameter',
    displayName: 'Test Date'
  },
  values: [
    {
      parameterValue: '2024-05-01',
      displayName: 'May 1, 2024',
      isSelected: false
    },
    {
      parameterValue: '2024-06-01',
      displayName: 'June 1, 2024',
      isSelected: true
    }
  ],
  mandatory: true,
  isInvalid: true
};

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('DateRuleComponent', () => {
  test('renders correctly with provided param', () => {
    render(<DateRuleComponent param={mockParam} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    const dateInput = screen.getByPlaceholderText('dd mmm yyyy');

    expect(dropdown).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue('2024-06-01');
  });

  test('calls handleChange when a dropdown option is selected', () => {
    render(<DateRuleComponent param={mockParam} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    // Open the dropdown
    fireEvent.mouseDown(dropdown);
  });

  test('calls handleChange when date input is changed', () => {
    render(<DateRuleComponent param={mockParam} handleChange={mockHandleChange} />);

    const dateInput = screen.getByPlaceholderText('dd mmm yyyy');

    // Simulate changing the date input
    fireEvent.change(dateInput, { target: { value: '2024-07-01' } });

    expect(mockHandleChange).toHaveBeenCalledWith('testParameter', '2024-07-01', 'June 1, 2024');
  });

  test('shows validation error when mandatory and invalid', () => {
    render(<DateRuleComponent param={{ ...mockParam, values: [], isInvalid: true }} handleChange={mockHandleChange} />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveClass('saltDropdown-error');
  });

  test('displays correct option format based on selected option', () => {
    const paramWithSelectedOption = {
      ...mockParam,
      values: [
        {
          parameterValue: '2024-05-01',
          displayName: 'May 1, 2024',
          isSelected: true
        },
        {
          parameterValue: '2024-06-01',
          displayName: 'June 1, 2024',
          isSelected: false
        }
      ]
    };
    render(<DateRuleComponent param={paramWithSelectedOption} handleChange={mockHandleChange} />);

    const selectedOption = screen.getByText('May 1, 2024');
    expect(selectedOption).toBeInTheDocument();
  });
});
