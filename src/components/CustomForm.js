import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckboxComponent } from '../components/Checkbox';
import { DateRuleComponent } from '../components//DateRule';
import { DropdownComponent } from '../components/DropDown';
import { SelectListAgGrid } from '../components/SelectListAgGrid';
import { MultiSelectList } from '../components/MultiSelect';
import { FormField, FormFieldLabel, FlexLayout, FlexItem, Button, H1, } from '@salt-ds/core';
import { handleChange as handleChangeFunction } from '../components/Helper'
export const CustomFormComponent = ({ formData, onSubmit, setCurrentSelectedParameter, setFormData }) => {

  // const handleChangeOld = useCallback((parameterName, value, curretSelectedValue = '') => {
  //   setFormData(prevFormData => {
  //     return prevFormData.map(param => {
  //       if (param.parameter.parameterName !== parameterName) return param;

  //       let updatedValues;

  //       switch (param.type) {
  //         case 'selectlist':
  //           updatedValues = param.values.map(item => ({
  //             ...item,
  //             isSelected: value.some(val => val.parameterValue === item.parameterValue)
  //           }));

  //           const newValue = value.find(val => !param.values.some(item => item.parameterValue === val.parameterValue));

  //           if (newValue) {
  //             updatedValues = [...updatedValues, {
  //               displayName: newValue.displayName,
  //               parameterValue: newValue.parameterValue,
  //               isSelected: true
  //             }];
  //           }
  //           break;

  //         case 'dateRule':
  //           updatedValues = param.values.map(item => {
  //             const isUserDefined = curretSelectedValue === "User Defined" && item.displayName === 'User Defined';
  //             return {
  //               ...item,
  //               parameterValue: isUserDefined ? value : item.parameterValue,
  //               isSelected: isUserDefined || item.parameterValue === value
  //             };
  //           });
  //           break;

  //         default:
  //           updatedValues = param.values.map(item => ({
  //             ...item,
  //             isSelected: item.parameterValue === value
  //           }));
  //           break;
  //       }

  //       return { ...param, values: updatedValues };
  //     });
  //   });

  //   setCurrentSelectedParameter({ parameterName, value });
  //   setIsValueChanged(true);
  // }, [setFormData, setCurrentSelectedParameter, setIsValueChanged]);

  const handleChange = useCallback(handleChangeFunction(setFormData, setCurrentSelectedParameter),
    [setFormData, setCurrentSelectedParameter]);

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
              {/* {param.type === 'radio' && <RadioButtonComponent param={param} handleChange={handleChange} />} */}
              {param.type === 'selectlist' && <SelectListAgGrid param={param} handleChange={handleChange} />}
              {/* {param.type === 'selectlist' && <MultiSelectList param={param} handleChange={handleChange} />} */}
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
            <Button value={'Reset'} onClick={handleReset} variant="secondary">CANCEL</Button>
            <Button value={'Primary'} onClick={handleSubmit}>RUN</Button>
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