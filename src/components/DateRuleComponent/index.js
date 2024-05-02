import React from 'react';
import PropTypes from 'prop-types';
import { DateInput } from '@salt-ds/lab';
import { Dropdown, Option, StackLayout } from '@salt-ds/core';

export const DateRuleComponent = ({ param, handleChange }) => {
    const defaultSelectedOption = param.values.find(option => option.isSelected);
    return (
        <StackLayout gap={1} direction="row">
            <Dropdown
                valueToString={(option) => option.displayName || [defaultSelectedOption.displayName]}
                defaultSelected={defaultSelectedOption ? [defaultSelectedOption.displayName] : []}
                validationStatus={param.mandatory && !defaultSelectedOption && param.isInvalid ? 'error' : null}
                onSelectionChange={(e, selectedOption) => handleChange(param.parameter.parameterName, selectedOption[0].parameterValue)}
            >
                {param.values.map((option) => (
                    <Option key={option.parameterValue} value={option}>
                        {option.displayName}
                    </Option>
                ))}
            </Dropdown>
            <DateInput
                label={param.parameter.displayName}
                value={defaultSelectedOption?.parameterValue}
                onChange={(e) => handleChange(param.parameter.parameterName, e.target.value)}
            />
        </StackLayout>)
}

DateRuleComponent.propTypes = {
    param: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};