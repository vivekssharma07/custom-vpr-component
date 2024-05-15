import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonComponent } from '../RadioComponent';
import { CheckboxComponent } from '../CheckboxComponent';
import { DateRuleComponent } from '../DateRuleComponent';
import { DropdownComponent } from '../DropDownComponent';
import { TableWithCustomDropdown } from '../TableWithCustomDropdown';
import { FormField, FormFieldLabel, FlexLayout, FlexItem, Button, H1, } from '@salt-ds/core';

export const CustomFormComponent = ({ formData, onSubmit, setCurrentSelectedParameter,setFormData }) => {
  // State to manage form data
  //const [formData, setFormData] = useState(parameters);

  // useEffect(() => {
  //   // Update formData whenever parameters change
  //   setFormData(parameters);
  // }, [parameters]);

  const handleChange = (parameterName, value) => {
    let updatedFormData = formData.map(param => {
      if (param.parameter.parameterName === parameterName) {
        if (param.type === 'selectlist') {
          const updatedValues = param.values.map(item => ({
            ...item,
            isSelected: value.some(val => val.parameterValue === item.parameterValue) ? true : item.isSelected
          }));
          return { ...param, values: updatedValues };
        } else {
          // For other parameters, update isSelected based on parameterValue
          const updatedValues = param.values.map(item => ({
            ...item,
            isSelected: item.parameterValue === value
          }));
          return { ...param, values: updatedValues };
        }
      }
      return param;
    });
    setFormData(updatedFormData);
    setCurrentSelectedParameter({parameterName, value})
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
    <FlexLayout direction="column">
      {formData && formData?.length ? (
        formData.map((param, index) => (
          <FlexItem key={param.parameter.parameterName}>
            <FormField labelPlacement="left">
              <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
                {param.type === 'dateRule' && <DateRuleComponent param={param} handleChange={handleChange} />}
                {param.type === 'dropdown' && <DropdownComponent param={param} handleChange={handleChange} />}
                {param.type === 'checkbox' && <CheckboxComponent param={param} handleChange={handleChange} />}
                {param.type === 'radio' && <RadioButtonComponent param={param} handleChange={handleChange} />}
                {param.type === 'selectlist' && <TableWithCustomDropdown param={param} handleChange={handleChange} />}
            </FormField>
          </FlexItem>
        ))
      ) : (
        <FlexItem>
          <H1>Data not found</H1>
        </FlexItem>
      )}

      {formData && formData?.length ? ( // Only render buttons if formData is not empty
        <FlexItem style={{ marginTop: '40px' }}>
          <FlexLayout direction="vertical" gap={1}>
            <Button value={'Reset'} onClick={handleReset} variant="secondary">Close</Button>
            <Button value={'Primary'} onClick={handleSubmit}>Submit</Button>
          </FlexLayout>
        </FlexItem>
      ) : ''}
    </FlexLayout>
  );
};

CustomFormComponent.propTypes = {
  formData: PropTypes.arrayOf(PropTypes.shape({
    parameter: PropTypes.shape({
      parameterName: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf(['radio', 'checkbox', 'dateRule', 'dropdown']).isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      parameterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      displayName: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })).isRequired,
    mandatory: PropTypes.bool.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};