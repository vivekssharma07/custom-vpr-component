import React, { useState } from 'react';
import {
  Input, Checkbox, Dropdown, Button,
  FormField,
  FlowLayout,
  FormFieldLabel,
  StackLayout,
  Option
} from '@salt-ds/core';
import { DateInput } from '@salt-ds/lab';

const FormComponent = ({ parameters, onSubmit }) => {

  const [formData, setFormData] = useState({});

  const handleChange = (parameterName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [parameterName]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onSubmit handler with form data
    onSubmit(formData);
  };

  return (
    <FlowLayout style={{ width: "350px" }}>
      {parameters.map(param => {
        switch (param.type) {
          case 'date':
            return (
              <FormField key={param.parameter.type}>
                <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
                <StackLayout gap={1} direction={"row"} role="group">
                  <DateInput
                    label={param.parameter.displayName}
                    value={formData[param.parameter.parameterName] || ''}
                    onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
                  />
                </StackLayout>
              </FormField>
            );
          case 'dropDown':
            return (
              <FormField key={param.parameter.type}>
                <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
                <StackLayout gap={1} direction={"row"} role="group">
                  <Dropdown
                    valueToString={(option) => option.displayName}
                    onSelectionChange={(e, selectedOption) => handleChange(param.parameter.parameterName, selectedOption[0].parameterValue)}
                  >
                    {param.values.map((option) => (
                      <Option key={option.parameterValue} value={option}>
                        {option.displayName}
                      </Option>
                    ))}
                  </Dropdown>
                </StackLayout>
              </FormField>
            );
          case 'text':
            return (
              <FormField key={param.parameter.type}>
                <FormFieldLabel>{param.parameter.displayName}</FormFieldLabel>
                <StackLayout gap={1} direction={"row"} role="group">
                  <Input
                    type="text"
                    value={formData[param.parameter.parameterName] || ''}
                    onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
                  />
                </StackLayout>
              </FormField>
            );
          case 'checkbox':
            return (
              <FormField key={param.parameter.type}>
                <StackLayout
                  gap={1}
                  direction={"row"}
                  as="fieldset"
                  style={{ margin: "0px", border: "none", padding: "0px" }}
                >
                  <Checkbox
                    checked={formData[param.parameter.parameterName] || false}
                    onChange={(e) => handleChange(param.parameter.parameterName, e.target.checked)}
                    label={param.parameter.displayName}
                  />
                </StackLayout>
              </FormField>
            );
          case 'number':
            return (
              <FormField key={param.parameter.type}>
                <FormFieldLabel>Number Field</FormFieldLabel>
                <StackLayout gap={1} direction={"row"} role="group">
                  <Input
                    value={formData[param.parameter.parameterName] || ''}
                    onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
                  />
                </StackLayout>
              </FormField>
            )
          default:
            return null;
        }
      })}
      <Button value={'Primary'} onClick={handleSubmit}>Submit</Button>
    </FlowLayout>
  );
};

export default FormComponent;