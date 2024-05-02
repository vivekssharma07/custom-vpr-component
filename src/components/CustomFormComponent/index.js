import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FlowLayout, FormField, FormFieldLabel } from '@salt-ds/core';
import { RadioButtonComponent } from '../RadioComponent';
import { CheckboxComponent } from '../CheckboxComponent';
import { DateRuleComponent } from '../DateRuleComponent';
import { DropdownComponent } from '../DropDownComponent';

export const CustomFormComponent = ({ parameters, onSubmit }) => {
  // State to manage form data
  const [formData, setFormData] = useState(parameters);

  // Handler function to update form data on change
  const handleChange = (parameterName, value) => {
    if (parameterName === 'sampleParameter') {
      const formatData = formatSampledParameterRequest(parameterName, value)
      console.log("On Change ", formatData)
    }

    // Update form data based on parameterName and value
    setFormData(prevState => prevState.map(param => ({
      ...param,
      values: param.parameter.parameterName === parameterName
        ? param.values.map(item => ({ ...item, isSelected: item.parameterValue === value }))
        : param.values
    })));
  };

  const formatSampledParameterRequest = (parameterName, value) => {
    const profileId = 12345;
    const parameterToUpdate = [];
    const parentParameters = {};

    // Find the parameter object in the form data based on parameterName
    const param = formData.find(param => param.parameter.parameterName === parameterName);

    // Find the child parameter name from the dynamic property
    const child = param?.dynamic?.children[0];

    // If parameter and child exist, update parameterToUpdate and parentParameters
    if (param && child) {
      parameterToUpdate.push(child);
      parentParameters[parameterName] = [{ parameterValue: value }];
    }

    return { profileId, parameterToUpdate, parentParameters };
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check for mandatory fields
    const isFormValid = formData.every(param => !param.mandatory || param.values.some(item => item.isSelected));
    // If form is valid, submit data; otherwise, set invalid flag for mandatory fields
    if (isFormValid) {
      onSubmit(formData);
    } else {
      setFormData(prevState => prevState.map(param => ({
        ...param,
        isInvalid: param.mandatory && !param.values.some(item => item.isSelected)
      })));
    }
  };

  const handleReset = () => {
    const resetData = formData.map(param => ({
      ...param,
      values: param.values.map(item => ({ ...item, isSelected: false }))
    }));
    setFormData(resetData);
  };

  return (
    <FlowLayout style={{ width: "350px" }}>
      {formData.map(param => (
        <FormField key={param.parameter.parameterName}>
          <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
          {param.type === 'dateRule' && <DateRuleComponent param={param} handleChange={handleChange} />}
          {param.type === 'dropDown' && <DropdownComponent param={param} handleChange={handleChange} />}
          {param.type === 'Checkbox' && <CheckboxComponent param={param} handleChange={handleChange} />}
          {param.type === 'Radiobutton' && <RadioButtonComponent param={param} handleChange={handleChange} />}
        </FormField>
      ))}
      <Button value={'Reset'} onClick={handleReset} variant="secondary">Reset</Button>
      <Button value={'Primary'} onClick={handleSubmit}>Submit</Button>
    </FlowLayout>
  );
};

CustomFormComponent.propTypes = {
  formData: PropTypes.arrayOf(PropTypes.shape({
    parameter: PropTypes.shape({
      parameterName: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf(['Radiobutton', 'Checkbox', 'dateRule', 'dropDown']).isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      parameterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      displayName: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })).isRequired,
    mandatory: PropTypes.bool.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};