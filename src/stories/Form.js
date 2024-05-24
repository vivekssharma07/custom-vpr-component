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
import axios, { formToJSON } from 'axios';
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
}]

export const Form = () => {
    const [formData, setFormData] = useState([]);
    const [currentSelectParameter, setCurrentSelectedParameter] = useState({});
    const [isValueChanged, setIsValueChanged] = useState(false);
    const [isInitialCall, setInitialCall] = useState(false);

    const handleSubmit = (formData) => {
        console.log("On Form Submit", formData);
    };

    const fetchAccountData = async (reqBody) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const URL = 'https://jsonplaceholder.typicode.com/todos';
            //const response = await axios.post(URL, reqBody, { headers });
            updateformData(apiResponse)
            //console.log("Response ", response);
            //setFormData(parameters);
        } catch (error) {
            console.error("Error fetching account data: ", error);
        }
    };

    // Define a function to fetch data
    const fetchInitialData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            //const response = await axios.get('https://jsonplaceholder.typicode.com/todos/', { headers });
            // Update state with the fetched data
            setFormData(mockData?.parameters);
            setInitialCall(true)
        } catch (error) {
            // Handle any errors that occur during the API call
            console.log("Error :", error)
        }
    };

    const updateformData = useCallback((apiResponse) => {
        const updatedformData = formData.map(row => {
            const matchingParam = apiResponse.find(apiParam => apiParam.parameter.parameterName === row.parameter.parameterName);
            if (matchingParam) {
                return { ...row, values: matchingParam.values };
            }
            return row;
        });
        setFormData(updatedformData);
        setCurrentSelectedParameter({});
    }, [formData, setFormData, setCurrentSelectedParameter]);

    useEffect(() => {
        if (isInitialCall) {
            const reqBody = formatSampledParameterRequest(mockData?.parameters)
            console.log("Request Body isInitialCall", reqBody)
            fetchAccountData(reqBody)
        }
    }, [isInitialCall])

    useEffect(() => {
        if (isValueChanged) {
            const reqBody = formatSampledParameterRequest(mockData?.parameters)
            console.log("Request Body isValueChanged", reqBody)
            fetchAccountData(reqBody)
        }
    }, [isValueChanged])

    useEffect(() => {
        fetchInitialData();
    }, [])

    console.log("Form Data", formData)

    return (<>
        <SaltProvider>
            <CustomFormComponent
                formData={formData}
                onSubmit={handleSubmit}
                setCurrentSelectedParameter={setCurrentSelectedParameter}
                setFormData={setFormData}
                setIsValueChanged={setIsValueChanged}
            />
        </SaltProvider>
    </>

    );
};