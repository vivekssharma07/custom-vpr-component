import { useEffect, useState } from "react"
import { RunAsElement } from "./RunAsElement"
import { H2 } from "@salt-ds/core"
import axios from 'axios';

export const RunAs = (props) => {
    const { requestHeaders, requestParameters, structureURL, valuesURL, onchange, runAsStructure } = props;

    const [runAsState, setRunAsState] = useState(runAsStructure);
    const [initialized, setInitialized] = useState(false);

    console.log("runAsState", runAsState)
    const getRoots = (state) => {
        let allParameters = state?.parameters?.map((param) => param?.parameter?.parameterName);
        return Array.from(getParents(allParameters, state)).filter((r) =>
            !state?.parameters?.find((p) => p?.parameter?.parameterName === r)?.dynamic?.parents
        );
    }

    const getParents = (parameter, state) => {
        return Array.from(parameters?.reduce((prevParents, param) => {
            let parameter = state.parameters?.find((p) => p.parameter.parameterName === param)
            parameter?.dynamic?.parent?.forEach((r) => prevParents?.add(r))
            return prevParents
        }, new Set()));
    }

    const fetchValues = async (paramtersToUpdate, parentParameters) => {
        const response = await axios.post(valuesURL, { paramtersToUpdate: paramtersToUpdate, parentParameters: parentParameters })
        if (response.status === 200) {
            return response?.data
        }
    }

    const fetchChildren = async (children, state) => {
        let parents = getParents(children, state);
        let parentValues;
        if (parents?.length > 0) {
            let selectedValues = getSelectedValues(state);
            parentValues = parents?.reduce((prevValues, p) => {
                prevValues.push({ name: p, values: selectedValues?.get(p)?.map((v) => v.value) })
                return prevValues
            }, [])
        }
    }

    const handleChange = async (parameterName, selectedValues) => {
        let parameter = runAsState?.parameters?.find((p) => p.parameter.parameterName === parameterName);
        parameter?.values?.forEach((value) => {
            value.isSelected = selectedValues.includes(value.parameterValue);
        });

        updateValues({ parameters: [parameter] }, runAsState)

        if (parameter?.dynamic?.children) {
            let newValues = await fetchChildren(parameter?.dynamic?.children, runAsState)
            updateValues({ parameters: newValues?.parameters }, runAsState)
        }
    }

    const getSelectedValues = (state) => {
        return state?.parameters?.reduce((prevSelected, param) => {
            if (param?.parameter?.parameterName) {
                let selectedValues = param?.values?.reduce((prevValues, value) => {
                    if (value.isselected) {
                        prevValues.push({ value: value.parameterValue, label: value.displayName });
                    }
                    return prevValues;
                }, []);

                if (selectedValues.length > 0) {
                    prevSelected.set(param.parameter.parameterName, selectedValues);
                }
            }
            return prevSelected;
        }, new Map());
    }

    const getInititalParametesToUpdate = (state) => {
        let roots = getRoots(state)
        return roots?.filter((r) => state?.parameter?.find((p) => p.parameter.parameterName === r)?.values?.length == 0)
    }

    const fetchStructure = async () => {
        let newRunAsState = runAsStructure
        if (!newRunAsState) {
            const response = await axios.get(structureURL, { headers: { ...requestHeaders, "Content-Type": "application/json" } })
            if (response?.status === 200) {
                newRunAsState = response?.data
                console.log("new", newRunAsState)
            } else {
                console.log("new else ", newRunAsState)
            }
            if (!initialized) {
                let newValues = await fetchValues(getInititalParametesToUpdate(runAsState))
                updateValues(newValues, newRunAsState)
            }
            setInitialized(true)
        }
    }

    useEffect(() => {
        fetchStructure()
    }, [initialized])

    return (
        <>
            {runAsState?.profileId && runAsState?.name && <H2>{runAsState?.name}</H2>}
            {runAsState?.parameters?.map((param) => (
                <RunAsElement
                    key={param.parameter.parameterName}  // Adding a key prop for list elements
                    type={param.type}
                    name={param.parameter.parameterName}
                    values={param.values}
                    handleChange={handleChange}
                    label={param.parameter.displayName}
                    helper={param.description}
                />
            ))}
        </>
    )
}