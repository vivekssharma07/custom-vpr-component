import { Dropdown, Option, StackLayout } from '@salt-ds/core';

export const MultiSelectComponent = ({ param, handleChange }) => {
    return (
        <StackLayout gap={1} direction="row">
            <Dropdown
                multiselect
                valueToString={(option) => option.displayName}
                defaultSelected={param.values.filter(option => option.isSelected)}
            >
                {param.values.map((option) => (
                    <Option key={option.parameterValue} value={option}>
                        {option.displayName}
                    </Option>
                ))}
            </Dropdown>
        </StackLayout >
    );
};


MultiSelectComponent.propTypes = {
    param: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};
