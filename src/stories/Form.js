import React, { useEffect, useState, useCallback } from 'react';
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/300-italic.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/500-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";
import "@fontsource/pt-mono";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";
import { CustomFormComponent } from '../components/CustomForm.js';
import { mockData } from './fieldsData.js';
import { formatSampledParameterRequest } from '../components/Helper.js';
import { fetchAccountData, fetchInitialData } from '../stories/utils.js';

export const Form = () => {
    const [formData, setFormData] = useState(mockData?.parameters);
    const [currentSelectParameter, setCurrentSelectedParameter] = useState({});
    const [isValueChanged, setIsValueChanged] = useState(false);

    const handleSubmit = (formData) => {
        console.log("On Form Submit", formData);
    };

    const updateRowData = useCallback((apiResponse) => {
        let isChanged = false;
        const updatedformData = formData.map(row => {
            const matchingParam = apiResponse.find(apiParam => apiParam.parameter.parameterName === row.parameter.parameterName);
            if (matchingParam) {
                const isRowChanged = JSON.stringify(row.values) !== JSON.stringify(matchingParam.values);
                if (isRowChanged) {
                    isChanged = true;
                    return { ...row, values: matchingParam.values };
                }
            }
            return row;
        });

        if (isChanged) {
            setIsValueChanged(true)
            setFormData(updatedformData);
        }
    }, [formData]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetchInitialData();
            updateRowData(resp)
            const reqBody = formatSampledParameterRequest(mockData?.parameters);
            console.log("Request Body isValueChanged", reqBody);
            const accResp = await fetchAccountData(reqBody);
            updateRowData(accResp)
        };
        fetchData();
    }, []);

    useEffect(() => {
        const validParametersName = new Set(["BU", "ANNUALIZED_CUMULATIVE", "REPORT_ID"])
        if (isValueChanged && validParametersName.has(currentSelectParameter?.parameterName)) {
            if (formData?.length) {
                const reqBody = formatSampledParameterRequest(formData);
                console.log("Request Body isValueChanged", reqBody);
                fetchAccountData(reqBody).then((res) => {
                    updateRowData(res)
                });
            }
        }
    }, [isValueChanged, formData]);

    console.log("Form Data", formData);

    return (
        <SaltProvider>
            <CustomFormComponent
                formData={formData}
                onSubmit={handleSubmit}
                setCurrentSelectedParameter={setCurrentSelectedParameter}
                setFormData={setFormData}
            />
        </SaltProvider>
    );
};