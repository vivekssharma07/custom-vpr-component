import React from 'react';
import { Dropdown, Option, StackLayout } from '@salt-ds/core';
import PropTypes from 'prop-types';

export const DropdownComponent = ({ param, handleChange }) => (
    <StackLayout gap={1} direction="row">
        <Dropdown
            valueToString={(option) => option?.displayName || [param.values.find((option) => option.isSelected)?.displayName]}
            defaultSelected={param.values.some((option) => option.isSelected) ? [param.values.find((option) => option.isSelected)?.displayName] : []}
            validationStatus={param.mandatory && !param.values.some((option) => option.isSelected) && param.isInvalid ? 'error' : null}
            onSelectionChange={(e, selectedOption) => handleChange(param.parameter?.parameterName, selectedOption?.[0]?.parameterValue)}
        >
            {param.values.map((option) => (
                <Option key={option.parameterValue} value={option}>
                    {option.displayName}
                </Option>
            ))}
        </Dropdown>
    </StackLayout>
)


DropdownComponent.propTypes = {
    param: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};