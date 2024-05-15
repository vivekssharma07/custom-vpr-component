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
import { parameters } from './fieldsData.json';
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
    "isDate" :true
}]

export const Form = () => {
    const [rowData, setRowData] = useState([]);
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
            updateRowData(apiResponse)
            //console.log("Response ", response);
            //setRowData(parameters);
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
            setRowData(parameters);
        } catch (error) {
            // Handle any errors that occur during the API call
            console.log("Error :", error)
        }
    };
    
    const formatSampledParameterRequest = (parameterName, value) => {
        let parameterToUpdate = [];
        const parentParameters = [];

        // Find the parameter object in the form data based on parameterName
        const param = rowData.find(param => param.parameter.parameterName === parameterName);

        // Find the child parameter name from the dynamic property
        const child = param?.dynamic?.children;

        // If parameter and child exist, update parameterToUpdate and parentParameters
        if (param && child) {
            parameterToUpdate = child;

            // Add the parent parameter to the parentParameters array
            parentParameters.push({
                name: parameterName,
                values: [value]
            });
        }

        return { parameterToUpdate, parentParameters };
    };

    const updateRowData = (apiResponse) => {
        const updatedRowData = rowData.map(row => {
            const matchingParam = apiResponse.find(apiParam => apiParam.parameter.parameterName === row.parameter.parameterName);
            if (matchingParam) {
                return { ...row, values: matchingParam.values };
            }
            return row;
        });
        setRowData(updatedRowData);
        setCurrentSelectedParameter({})
    };

    useEffect(() => {
        console.log("currentSelectParameter", currentSelectParameter)
        if (currentSelectParameter?.parameterName === 'BU' || currentSelectParameter?.parameterName == 'ANNUALIZED_CUMULATIVE') {
            const reqBody = formatSampledParameterRequest(currentSelectParameter?.parameterName, currentSelectParameter?.value)
            console.log("Request Body ",reqBody)
            fetchAccountData(reqBody)
        }
    }, [currentSelectParameter])

    useEffect(() => {
        // Call the fetch data function when the component mounts
        fetchInitialData();
    }, []);

    console.log("Row Data", rowData)

    return (<>
        <SaltProvider>
            <CustomFormComponent parameters={rowData} onSubmit={handleSubmit} setCurrentSelectedParameter={setCurrentSelectedParameter} />
        </SaltProvider>
    </>

    );
};