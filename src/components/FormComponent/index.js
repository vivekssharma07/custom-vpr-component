import React, { useState } from 'react';
import { Input, Checkbox, Dropdown, Button, FormField, FlowLayout, FormFieldLabel, StackLayout, Option, RadioButton } from '@salt-ds/core';
import { DateInput } from '@salt-ds/lab';

const FormComponent = ({ parameters, onSubmit }) => {
  // State to manage form data
  const [formData, setFormData] = useState(parameters);

  // Handler function to update form data on change
  const handleChange = (parameterName, value) => {
    setFormData(prevState => {
      const updatedParameters = prevState.map(param => {
        if (param.parameter.parameterName === parameterName) {
          return {
            ...param,
            // Update isSelected property based on the selected value
            values: param.values.map(item => ({
              ...item,
              isSelected: item.parameterValue === value
            }))
          };
        }
        return param;
      });
      return updatedParameters;
    });
  };

  // Render Dropdown component with default selected value
  const renderDropdown = (param) => {
    // Find the default selected option
    const defaultSelectedOption = param.values.find(option => option.isSelected);
    const enableDropwDown = formData.find(item => item.type === "dropDown" && item.parameter.parameterName === "sampleParameter")?.values.some(option => option.isSelected) || false;
    return (
      <Dropdown
        valueToString={(option) => option.displayName || [defaultSelectedOption?.displayName]}
        defaultSelected={defaultSelectedOption ? [defaultSelectedOption.displayName] : []}
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
    return (<DateInput label={param.parameter.displayName} value={defaultSelectedOption?.parameterValue}
      onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)} />)
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = formatValue();
    onSubmit(reqData);
  };

  // Format form data for submission
  const formatValue = () => {
    const profileId = 12345;
    const parameterToUpdate = [];
    const parentParameters = {};

    formData.forEach(param => {
      // Check if dynamic parents include either "sampleParameter" or "multiView"
      if (param.dynamic && (param.dynamic.parents.includes("sampleParameter") || param.dynamic.parents.includes("multiView"))) {
        const selectedValues = param.values.filter(value => value.isSelected);
        if (selectedValues.length > 0) {
          const parameterName = param.parameter.parameterName;
          parameterToUpdate.push(parameterName);
          parentParameters[parameterName] = selectedValues.map(value => ({ parameterValue: value.parameterValue }));
        }
      }
    });

    return { profileId, parameterToUpdate, parentParameters };
  };

  return (
    <FlowLayout style={{ width: "350px" }}>
      {formData.map(param => (
        <FormField key={param.parameter.parameterName}>
          <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
          <StackLayout gap={1} direction="row" role="group">
            {param.type === 'dateRule' ? (
              // Render Dropdown and DateInput for 'dateRule' type
              <>
                {renderDropdown(param)}
                {renderDateInput(param)}
              </>
            ) : param.type === 'dropDown' ? (
              // Render Dropdown for 'dropDown' type
              renderDropdown(param)
            ) : param.type === 'text' ? (
              // Render Input for 'text' type
              <Input
                type="text"
                value={formData[param.parameter.parameterName] || ''}
                onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
              />
            ) : param.type === 'Checkbox' ? (
              // Render Checkbox for 'Checkbox' type
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
            ) : param.type === 'Radiobutton' ? (
              // Render RadioButton for 'Radiobutton' type
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
            ) : null}
          </StackLayout>
        </FormField>
      ))}
      <Button value={'Primary'} onClick={handleSubmit}>Submit</Button>
    </FlowLayout>
  );
};

export default FormComponent;
