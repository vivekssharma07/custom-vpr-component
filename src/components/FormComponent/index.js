import React, { useState } from 'react';
import { Input, Checkbox, Dropdown, Button, FormField, FlowLayout, FormFieldLabel, StackLayout, Option, RadioButton } from '@salt-ds/core';
import { DateInput } from '@salt-ds/lab';

const FormComponent = ({ parameters, onSubmit }) => {
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


  // Render input based on parameter type
  const renderInput = (param) => {
    switch (param.type) {
      case 'dateRule':
        return (
          <>
            {renderDropdown(param)}
            {renderDateInput(param)}
          </>
        );
      case 'dropDown':
        return renderDropdown(param);
      case 'text':
        return (
          <Input
            type="text"
            value={formData[param.parameter.parameterName] || ''}
            onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
          />
        );
      case 'Checkbox':
        return (
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
      case 'Radiobutton':
        return (
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
      default:
        return null;
    }
  };

  // Render Dropdown component with default selected value
  const renderDropdown = (param) => {
    const defaultSelectedOption = param.values.find(option => option.isSelected);
    return (
      <Dropdown
        valueToString={(option) => option.displayName || [defaultSelectedOption?.displayName]}
        defaultSelected={defaultSelectedOption ? [defaultSelectedOption.displayName] : []}
        validationStatus={param.mandatory && !defaultSelectedOption && param.isInvalid ? 'error' : null} // Set validation status
        onSelectionChange={(e, selectedOption) => handleChange(param.parameter.parameterName, selectedOption[0].parameterValue)}
      >
        {param.values.map((option) => (
          <Option key={option.parameterValue} value={option}>
            {option.displayName}
          </Option>
        ))}
      </Dropdown>
    );
  };

  // Render DateInput component if User Defined option is selected
  const renderDateInput = (param) => {
    const defaultSelectedOption = param.values.find(option => option.isSelected);
    return (
      <DateInput
        label={param.parameter.displayName}
        value={defaultSelectedOption?.parameterValue}
        onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
      />
    );
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

  return (
    <FlowLayout style={{ width: "350px" }}>
      {formData.map(param => (
        <FormField key={param.parameter.parameterName}>
          <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
          <StackLayout gap={1} direction="row" role="group">
            {renderInput(param)}
          </StackLayout>
        </FormField>
      ))}
      <Button value={'Primary'} onClick={handleSubmit}>Submit</Button>
    </FlowLayout>
  );
};

export default FormComponent;
