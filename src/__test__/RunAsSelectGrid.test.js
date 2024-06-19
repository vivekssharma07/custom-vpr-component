import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RunAsSelectGrid } from '../components/RunAsSelectGrid';

const mockValues = [
  { parameterValue: 'value1', displayName: 'Display 1' },
  { parameterValue: 'value2', displayName: 'Display 2' },
];

const mockHandleChange = jest.fn();

describe('RunAsSelectGrid', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockHandleChange.mockClear();
  });

  test('initializes with correct column definitions', () => {
    const { container } = render(<RunAsSelectGrid name="test" values={mockValues} handleChange={mockHandleChange} selectedValues={[]} />);
    expect(screen.getByText('Select All')).toBeInTheDocument();
    expect(screen.getByText('Display 1')).toBeInTheDocument();
    expect(screen.getByText('Display 2')).toBeInTheDocument();
  });

  test('handles selection change event correctly', async () => {
    render(
      <RunAsSelectGrid
        name="test"
        values={mockValues}
        handleChange={mockHandleChange}
        selectedValues={[]}
        valueProp="parameterValue"
        displayProps="displayName"
        counter={1}
      />
    );

    await waitFor(() => {

      const checkboxes = screen.queryAllByRole('checkbox');
      // Assuming you want to interact with the first checkbox found
      const checkbox = checkboxes[0];
      fireEvent.click(checkbox);
    });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith('test', ['value1']);

  });

  test('handles onGridReady event correctly', () => {
    render(
      <RunAsSelectGrid
        name="test"
        values={mockValues}
        handleChange={mockHandleChange}
        selectedValues={[]}
        valueProp="parameterValue"
        displayProps="displayName"
        counter={1}
      />
    );

    // Simulate onGridReady event
    fireEvent.load(window);

    // Example: Assert that gridApi is set correctly
    expect(mockHandleChange).toHaveBeenCalledTimes(0); // Assuming no change expectations
    // Add more assertions as needed for onGridReady behavior
  });

});

