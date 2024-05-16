import React, { useEffect, useState } from 'react';
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
// Import <SaltProvider>
import { SaltProvider } from "@salt-ds/core";
// Import theme CSS
import "@salt-ds/theme/index.css";
import { CustomFormComponent } from '../components/CustomFormComponent';
import { secondaryMockData } from './fieldsData';
import axios from 'axios';

const apiResponse = [{
    "type": "dropdown",
    "parameter": {
        "displayName": "Time Period",
        "parameterName": "TP"
    },
    "values": [{
        "displayName": "Weekly",
        "parameterValue": "Weekly",
        "isSelected": true
    },
    {
        "displayName": "Monthly",
        "parameterValue": "Monthly",
        "isSelected": false
    }],
    "mandatory": true,
    "dynamic": {
        "parents": null,
        "children": [
            "BU",
            "ANNUALIZED_CUMULATIVE"
        ]
    },
    "description": null,
    "noSelect": null,
    "isDate": true
}]

export const SecondaryForm = () => {
    const [formData, setFormData] = useState(secondaryMockData?.parameters);
    const [currentSelectParameter, setCurrentSelectedParameter] = useState({});

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
            // updateformData(apiResponse)
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
            //setFormData(parameters);
        } catch (error) {
            // Handle any errors that occur during the API call
            console.log("Error :", error)
        }
    };

    const formatSampledParameterRequest = (parameterName, selectedValue) => {
        let parameterToUpdate = [];
        const parentParameters = [];

        const param = formData.find(param => param.parameter.parameterName === parameterName);
        if (!param) return { parameterToUpdate, parentParameters };

        if (parameterName === 'BU') {
            const filteredData = formData.filter(param =>
                param.parameter.parameterName !== parameterName &&
                param.dynamic &&
                param.dynamic.parents &&
                param.dynamic.parents.length === 1 &&
                param.dynamic.parents.includes(parameterName)
            );

            if (filteredData.length > 0) {
                parameterToUpdate = filteredData[0].parameter.parameterName;
                parentParameters.push({
                    name: parameterName,
                    values: [selectedValue]
                });
            }
        } else {
            const buParam = formData.find(param => param.parameter.parameterName === 'BU');
            if (buParam) {
                const buValue = buParam.values.filter(value => value.isSelected).map(value => value.parameterValue);
                parentParameters.push({
                    name: "BU",
                    values: buValue
                });
            }

            const values = param.values.filter(value => value.isSelected).map(value => value.parameterValue);
            parameterToUpdate = param.dynamic?.children || [];
            parentParameters.push({
                name: parameterName,
                values: values
            });
        }

        return { parameterToUpdate, parentParameters };
    };

    const updateformData = (apiResponse) => {
        const updatedformData = formData.map(row => {
            const matchingParam = apiResponse.find(apiParam => apiParam.parameter.parameterName === row.parameter.parameterName);
            if (matchingParam) {
                return { ...row, values: matchingParam.values };
            }
            return row;
        });
        setFormData(updatedformData);
        setCurrentSelectedParameter({})
    };

    useEffect(() => {
        console.log("currentSelectParameter", currentSelectParameter)
        //if (currentSelectParameter?.parameterName === 'BU' || currentSelectParameter?.parameterName == 'ANNUALIZED_CUMULATIVE') {
        const reqBody = formatSampledParameterRequest(currentSelectParameter?.parameterName, currentSelectParameter?.value)
        console.log("Request Body ", reqBody)
        //fetchAccountData(reqBody)
        //}
    }, [currentSelectParameter])

    useEffect(() => {
        // Call the fetch data function when the component mounts
        fetchInitialData();
    }, []);

    return (<>
        <SaltProvider>
            <CustomFormComponent 
                formData={formData}
                onSubmit={handleSubmit}
                setCurrentSelectedParameter={setCurrentSelectedParameter} 
                setFormData={setFormData} />
        </SaltProvider>
    </>

    );
};