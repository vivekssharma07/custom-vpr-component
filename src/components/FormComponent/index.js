import React, { useState } from 'react';
import { Input, Checkbox, Dropdown, Button, FormField, FlowLayout, FormFieldLabel, StackLayout, Option, RadioButton } from '@salt-ds/core';
import { DateInput } from '@salt-ds/lab';

const FormComponent = ({ parameters, onSubmit }) => {
  const [formData, setFormData] = useState(parameters);

  const handleChange = (parameterName, value) => {
    setFormData(prevState => {
      const updatedParameters = prevState.map(param => {
        if (param.parameter.parameterName === parameterName) {
          return {
            ...param,
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

  const isSelectedUserDefined = (options) => options.some(option => option.displayName === "User Defined" && option.isSelected);

  const renderDropdown = (param) => (
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
  );

  const renderDateInput = (param) => isSelectedUserDefined(param.values) ? (
    <DateInput label={param.parameter.displayName} />
  ) : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = formatValue();
    onSubmit(reqData);
  };

  const formatValue = () => {
    const profileId = 12345;
    const parameterToUpdate = [];
    const parentParameters = {};

    formData.forEach(param => {
      if (param.dynamic && param.dynamic.parents.includes("multiView")) {
        parameterToUpdate.push(param.parameter.parameterName);
      }
      if (param.dynamic && param.dynamic.parents.includes("sampleParameter")) {
        const values = param.values.filter(value => value.isSelected);
        if (values.length > 0) {
          const parameterName = param.parameter.parameterName;
          parentParameters[parameterName] = values.map(value => ({ parameterValue: value.parameterValue }));
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
              <>
                {renderDropdown(param)}
                {renderDateInput(param)}
              </>
            ) : param.type === 'dropDown' ? (
              renderDropdown(param)
            ) : param.type === 'text' ? (
              <Input
                type="text"
                value={formData[param.parameter.parameterName] || ''}
                onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
              />
            ) : param.type === 'Checkbox' ? (
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
