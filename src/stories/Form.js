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

export const Form = () => {
    const [data, setData] = useState([]);
    const [isAccountDropdownClicked, setAccountDropdownClicked] = useState();
    const handleSubmit = (formData) => {
        console.log("On Form Submit", formData);
    };

    useEffect(() => {
        console.log("isAccountDropdownClicked",isAccountDropdownClicked)
         // Define a function to fetch data
         const fetchAccountData = async () => {
            try {
                // Set headers with parameters
                const headers = {
                    'Content-Type': 'application/json', // Example header
                    //'Authorization': 'Bearer tscott', // Example header with token
                };

                // Make the API call using Axios with headers
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/', { headers });
                // Update state with the fetched data
                setData(parameters);
            } catch (error) {
                // Handle any errors that occur during the API call
                console.log("Error :", error)
            }
        };
        // Call the fetch data function when the component mounts
        fetchAccountData();

    },[isAccountDropdownClicked])

    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
            try {
                // Set headers with parameters
                const headers = {
                    'Content-Type': 'application/json', // Example header
                    //'Authorization': 'Bearer tscott', // Example header with token
                };

                // Make the API call using Axios with headers
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/', { headers });
                // Update state with the fetched data
                setData(parameters);
            } catch (error) {
                // Handle any errors that occur during the API call
                console.log("Error :", error)
            }
        };
        // Call the fetch data function when the component mounts
        fetchData();
    }, []);

    return (<>
        <SaltProvider>
            <CustomFormComponent parameters={data} onSubmit={handleSubmit} setAccountDropdownClicked={setAccountDropdownClicked}/>
        </SaltProvider>
    </>

    );
};