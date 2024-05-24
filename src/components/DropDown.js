import React from 'react';
import { Dropdown, Option, StackLayout } from '@salt-ds/core';
import PropTypes from 'prop-types';

export const DropdownComponent = ({ param, handleChange }) => {
    const { parameter, values, mandatory, isInvalid } = param;
    const { parameterName, parameterValue } = parameter;

    const selectedOption = values.find(option => option.isSelected);
    const isBU = parameterValue === 'BU';

    const dropdownValue = selectedOption
        ? [isBU ? selectedOption.displayName : `${selectedOption.displayName} (${selectedOption.parameterValue})`]
        : [];

    const validationStatus = mandatory && !selectedOption && isInvalid ? 'error' : null;

    const handleSelectionChange = (e, selectedOption) => {
        handleChange(parameterName, selectedOption?.[0]?.parameterValue);
    };

    return (
        <StackLayout gap={1} direction="row">
            <Dropdown
                value={dropdownValue}
                validationStatus={validationStatus}
                onSelectionChange={handleSelectionChange}
            >
                {values.map(option => (
                    <Option key={option.parameterValue} value={option}>
                        {isBU ? option.displayName : `${option.displayName} (${option.parameterValue})`}
                    </Option>
                ))}
            </Dropdown>
        </StackLayout>
    );
};

DropdownComponent.propTypes = {
    param: PropTypes.shape({
        parameter: PropTypes.shape({
            parameterName: PropTypes.string.isRequired,
            parameterValue: PropTypes.string.isRequired,
        }).isRequired,
        values: PropTypes.arrayOf(
            PropTypes.shape({
                parameterValue: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                isSelected: PropTypes.bool.isRequired,
            })
        ).isRequired,
        mandatory: PropTypes.bool,
        isInvalid: PropTypes.bool,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
};
