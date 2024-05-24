import React from 'react';
import PropTypes from 'prop-types';
import { StackLayout, Checkbox, CheckboxGroup } from '@salt-ds/core';

export const CheckboxComponent = ({ param, handleChange }) => {
  const { values } = param
  return (<StackLayout gap={1} direction="row">
    <CheckboxGroup onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)} direction="horizontal">
      {values.map(item => (
        <Checkbox
          key={item.parameterValue}
          checked={item.isSelected}
          value={item.parameterValue}
          label={item.displayName}
        />
      ))}
    </CheckboxGroup>
  </StackLayout>)
}

CheckboxComponent.propTypes = {
  param: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};