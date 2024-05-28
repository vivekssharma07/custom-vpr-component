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
import axios from 'axios';
import { formatSampledParameterRequest } from '../components/Helper.js';

const apiResponse = [{
    "type": "selectlist",
    "parameter": {
        "displayName": "Report Name",
        "parameterName": "REPORT_ID"
    },
    "values": [{
        "displayName": "Report Name",
        "parameterValue": "REPORT_NAME",
        "isSelected": true
    },
    {
        "displayName": "Report 2",
        "parameterValue": "REPORT2",
        "isSelected": false
    }],
    "mandatory": true,
    "dynamic": {
        "parents": [
            "BU"
        ],
        "children": [
            "REL_DT",
            "DTSTART",
            "DTENT"
        ]
    },
    "description": null,
    "noSelect": null
}];

export const Form = () => {
    const [formData, setFormData] = useState(mockData?.parameters);
    const [currentSelectParameter, setCurrentSelectedParameter] = useState({});
    const [isValueChanged, setIsValueChanged] = useState(false);

    const handleSubmit = (formData) => {
        console.log("On Form Submit", formData);
    };

    const fetchAccountData = async (reqBody) => {
        try {
            updateformData(apiResponse);
            console.log("Form Data after update:", formData);
        } catch (error) {
            console.error("Error fetching account data: ", error);
        }
    };

    const fetchInitialData = async () => {
        try {
            setFormData(mockData?.parameters || []);
            console.log("Initial Form Data:", mockData?.parameters);
        } catch (error) {
            console.log("Error fetching initial data:", error);
        }
    };

    const updateformData = useCallback((apiResponse) => {
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
            setCurrentSelectedParameter({});
        }
    }, [formData]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchInitialData();
            const reqBody = formatSampledParameterRequest(mockData?.parameters);
            console.log("Request Body isValueChanged", reqBody);
            await fetchAccountData(reqBody);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isValueChanged) {
            console.log("Current Form Data:", formData);
            const reqBody = formatSampledParameterRequest(formData);
            console.log("Request Body isValueChanged", reqBody);
            fetchAccountData(reqBody);
        }
    }, [isValueChanged]);

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
