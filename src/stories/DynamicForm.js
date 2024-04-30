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
import FormComponent from '../components/FormComponent/index';
import { parameters } from './fieldsData.json';

const DynamicForm = () => {

    const handleSubmit = (formData) => {
        console.log(formData);
    };

    return (<>
        <SaltProvider>
            <FormComponent parameters={parameters} onSubmit={handleSubmit} />
        </SaltProvider>
    </>

    );
};

export default DynamicForm;
