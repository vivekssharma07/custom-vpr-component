import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RunAsSelectGrid } from '../components/RunAsSelectGrid';
import userEvent from '@testing-library/user-event';

const mockValues = [
  { parameterValue: 'value1', displayName: 'Display 1' },
  { parameterValue: 'value2', displayName: 'Display 2' },
];

const mockHandleChange = jest.fn();

describe('RunAsSelectGrid Component', () => {
  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  test('renders with correct column definitions', () => {
    const { container } = render(<RunAsSelectGrid name="test" values={mockValues} handleChange={mockHandleChange} selectedValues={[]} />);
    expect(screen.getByText('Select All')).toBeInTheDocument();
    expect(screen.getByText('Display 1')).toBeInTheDocument();
    expect(screen.getByText('Display 2')).toBeInTheDocument();
  });

  test('handles selection change event when there are selected values', async () => {
    const handleChange = jest.fn();
    const props = {
      name: 'test',
      values: [{ displayName: 'Display 1', parameterValue: 'value1' }],
      handleChange,
      selectedValues: ['value1'],
      valueProp: 'parameterValue',
      displayProps: 'displayName',
      counter: 1,
    };

    const { getByTestId } = render(<RunAsSelectGrid {...props} />);

    // Simulate onGridReady event
    const grid = getByTestId('ag-grid');
    const gridReadyEvent = new CustomEvent('first-data-rendered', {
      detail: { api: { getSelectedRows: () => [{ parameterValue: 'value1' }] } },
    });
    grid.dispatchEvent(gridReadyEvent);

    // Click on the checkbox
    const checkboxes = screen.queryAllByRole('checkbox');
    const checkbox = checkboxes[0];
    await userEvent.click(checkbox);

    // Expect handleChange to be called with selectedValues
    expect(handleChange).toHaveBeenCalledWith(props.name, props.selectedValues);
  });

  test('handles selection change event when there are no selected values', async () => {
    const handleChange = jest.fn();
    const props = {
      name: 'test',
      values: [{ displayName: 'Display 1', parameterValue: 'value1' }],
      handleChange,
      selectedValues: [],
      valueProp: 'parameterValue',
      displayProps: 'displayName',
      counter: 1,
    };

    const { getByTestId } = render(<RunAsSelectGrid {...props} />);

    // Simulate onGridReady event
    const grid = getByTestId('ag-grid');
    const gridReadyEvent = new CustomEvent('first-data-rendered', {
      detail: { api: { getSelectedRows: () => [] } },
    });
    grid.dispatchEvent(gridReadyEvent);

    // Click on the checkbox
    const checkboxes = screen.queryAllByRole('checkbox');
    const checkbox = checkboxes[0];
    await userEvent.click(checkbox);

    // Expect handleChange to be called with selectedValues
    expect(handleChange).toHaveBeenCalledWith(props.name, props.selectedValues);
  });

});
