import React from 'react';
import PropTypes from 'prop-types';
import { StackLayout, RadioButton } from '@salt-ds/core';

export const RadioButtonComponent = ({ param, handleChange }) => (
  <StackLayout gap={1}>
    {param.values.map(item => (
      <RadioButton
        key={item.parameterValue}
        checked={item.isSelected}
        onChange={() => handleChange(param.parameter.parameterName, item.parameterValue)}
        label={item.displayName}
      />
    ))}
  </StackLayout>
);

RadioButtonComponent.propTypes = {
  param: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};