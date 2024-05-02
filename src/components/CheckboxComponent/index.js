import React from 'react';
import PropTypes from 'prop-types';
import { StackLayout, Checkbox } from '@salt-ds/core';

export const CheckboxComponent = ({ param, handleChange }) => (
  <StackLayout gap={1} direction="row">
    {param.values.map(item => (
      <Checkbox
        key={item.parameterValue}
        checked={item.isSelected || false}
        onChange={() => handleChange(param.parameter.parameterName, item.parameterValue)}
        label={item.displayName}
      />
    ))}
  </StackLayout>
);

CheckboxComponent.propTypes = {
    param: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};