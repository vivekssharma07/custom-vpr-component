import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DateInput } from '@salt-ds/lab';
import { Dropdown, Option, StackLayout } from '@salt-ds/core';
import debounce from 'lodash/debounce';

export const DateRuleComponent = ({ param, handleChange }) => {
  const { parameter, values, mandatory, isInvalid } = param;
  const { parameterName, displayName } = parameter;

  const defaultSelectedOption = useMemo(() => values.find(option => option.isSelected), [values]);
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption?.displayName);

  const handleSelectionChange = (e, selectedOption) => {
    const selectedDisplayName = selectedOption?.[0]?.displayName;
    setSelectedOption(selectedDisplayName);
    handleChange(parameterName, selectedOption?.[0]?.parameterValue);
  };

  // Debounced handleChange function
  const debouncedHandleChange = useCallback(
    debounce((parameterName, value, selectedOption) => {
      handleChange(parameterName, value, selectedOption);
    }, 300),
    [handleChange]
  );

  const handleDateChange = (e) => {
    const value = e.target.value;
    debouncedHandleChange(parameterName, value, selectedOption);
  };

  const dropdownValue = useMemo(() => {
    const selected = values.find(option => option.isSelected);
    return selected ? [selected.displayName] : [];
  }, [values]);

  const validationStatus = useMemo(() => {
    return mandatory && !values.some(option => option.isSelected) && isInvalid ? 'error' : null;
  }, [mandatory, values, isInvalid]);

  return (
    <StackLayout gap={1} direction="row">
      <Dropdown
        value={dropdownValue}
        validationStatus={validationStatus}
        onSelectionChange={handleSelectionChange}
      >
        {values.map(option => (
          <Option key={option.parameterValue} value={option}>
            {option.displayName}
          </Option>
        ))}
      </Dropdown>
      <DateInput
        label={displayName}
        value={defaultSelectedOption?.parameterValue}
        onChange={handleDateChange}
      />
    </StackLayout>
  );
};

DateRuleComponent.propTypes = {
  param: PropTypes.shape({
    parameter: PropTypes.shape({
      parameterName: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        parameterValue: PropTypes.string.isRequired,
        isSelected: PropTypes.bool,
      })
    ).isRequired,
    mandatory: PropTypes.bool,
    isInvalid: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
