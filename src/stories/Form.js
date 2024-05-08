import React from 'react';
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

export const Form = () => {

    const handleSubmit = (formData) => {
        console.log("On Form Submit", formData);
    };

    return (<>
        <SaltProvider>
            <CustomFormComponent parameters={parameters} onSubmit={handleSubmit} />
        </SaltProvider>
    </>

    );
};