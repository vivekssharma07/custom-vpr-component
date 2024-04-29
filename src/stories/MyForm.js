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

import DynamicForm from '../components/FormComponent/index';

const MyForm = () => {
    const handleSubmit = (formData) => {
        // Handle form submission here
        console.log(formData);
    };

    const fields = [
        { type: 'text', label: 'Text Field', value: '' },
        { type: 'checkbox', label: 'Checkbox', checked: false },
        { type: 'dropdown', label: 'Dropdown', value: '', options: ['Option 1', 'Option 2', 'Option 3'] },
        { type: 'date', label: 'Date Field', value: new Date() }
    ];

    return (<>
        <SaltProvider>
            <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </SaltProvider>
    </>

    );
};

export default MyForm;
