export const formatSampledParameterRequest = (data) => {
    // Initialize arrays to store parameters to update and parent parameters
    let parametersToUpdate = [];
    let parentParameters = [];
    // Iterate through each parameter
    data.forEach(childParam => {
        // Check if the child parameter has a single dynamic parent
        if (childParam.dynamic && childParam.dynamic.parents && childParam.dynamic.parents.length === 1) {
            const parentParamName = childParam.dynamic.parents[0];
            const parentParam = data.find(param => param.parameter.parameterName === parentParamName);
            // Proceed only if the parent parameter exists
            if (parentParam) {
                // Update parent parameters and values if not already done
                if (!parametersToUpdate.includes(childParam.parameter.parameterName)) {
                    parametersToUpdate.push(childParam.parameter.parameterName);
                    const selectedValue = parentParam.values.find(value => value.isSelected)?.parameterValue;

                    if (selectedValue) {
                        parentParameters.push({
                            name: parentParamName,
                            values: [selectedValue]
                        });
                    }
                }

                // Iterate through the children of the parent parameter
                parentParam.dynamic.children.forEach(grandChildParamName => {
                    const grandChildParam = data.find(param => param.parameter.parameterName === grandChildParamName);

                    // Proceed only if the grandchild parameter has dynamic parents
                    if (grandChildParam.dynamic && grandChildParam.dynamic.parents) {
                        grandChildParam.dynamic.parents.forEach(grandParentParamName => {
                            // Exclude the parent parameter itself
                            if (parentParamName !== grandParentParamName) {
                                const grandParentParam = data.find(param => param.parameter.parameterName === grandParentParamName);
                                const values = grandParentParam.values.filter(value => value.isSelected).map(value => value.parameterValue);

                                // Update parent parameters and values for the grandchild parameter
                                if (values.length && parentParamName !== grandParentParamName) {
                                    const childToUpdate = grandParentParam.dynamic.children[0];
                                    if (!parametersToUpdate.includes(childToUpdate)) {
                                        parametersToUpdate.push(childToUpdate);
                                    }
                                    parentParameters.push({
                                        name: grandParentParamName,
                                        values: [values]
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    });

    return { parametersToUpdate, parentParameters };
};

export const handleChange = (setFormData, setCurrentSelectedParameter) => (parameterName, value, currentSelectedValue = '') => {
    setFormData(prevFormData => {
        return prevFormData.map(param => {
            if (param.parameter.parameterName !== parameterName) return param;

            let updatedValues;

            switch (param.type) {
                case 'selectlist':
                    updatedValues = param.values.map(item => ({
                        ...item,
                        isSelected: value.some(val => val.parameterValue === item.parameterValue)
                    }));

                    const newValue = value.find(val => !param.values.some(item => item.parameterValue === val.parameterValue));

                    if (newValue) {
                        updatedValues = [...updatedValues, {
                            displayName: newValue.displayName,
                            parameterValue: newValue.parameterValue,
                            isSelected: true
                        }];
                    }
                    break;

                case 'dateRule':
                    updatedValues = param.values.map(item => {
                        const isUserDefined = currentSelectedValue === "User Defined" && item.displayName === 'User Defined';
                        return {
                            ...item,
                            parameterValue: isUserDefined ? value : item.parameterValue,
                            isSelected: isUserDefined || item.parameterValue === value
                        };
                    });
                    break;

                default:
                    updatedValues = param.values.map(item => ({
                        ...item,
                        isSelected: item.parameterValue === value
                    }));
                    break;
            }

            return { ...param, values: updatedValues };
        });
    });

    setCurrentSelectedParameter({ parameterName, value });
};
