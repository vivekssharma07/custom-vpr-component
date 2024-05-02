## CustomFormComponent

CustomFormComponent is a reusable React component for creating dynamic forms with various input types such as Radiobuttons, Checkboxes, DateRules, and Dropdowns.

### Installation

```bash
npm install @your-package-name/custom-form-component
```

### Usage

```jsx
import React, { useState } from 'react';
import { CustomFormComponent } from '@your-package-name/custom-form-component';

const initialFormData = [
  {
    parameter: {
      parameterName: 'exampleParameter',
      displayName: 'Example Parameter',
    },
    type: 'Radiobutton',
    values: [
      {
        parameterValue: 'value1',
        displayName: 'Value 1',
        isSelected: false,
      },
      {
        parameterValue: 'value2',
        displayName: 'Value 2',
        isSelected: false,
      },
    ],
    mandatory: true,
  },
  // Add more form parameters as needed
];

const YourComponent = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (formData) => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <CustomFormComponent formData={formData} onSubmit={handleSubmit} />
  );
};

export default YourComponent;
```

### Props

- `formData`: An array of objects representing the form parameters. Each object should have the following shape:
  - `parameter`: An object containing information about the parameter, including `parameterName` and `displayName`.
  - `type`: The type of input for the parameter (e.g., 'Radiobutton', 'Checkbox', 'dateRule', 'dropDown').
  - `values`: An array of objects representing the possible values for the parameter. Each object should have `parameterValue`, `displayName`, and `isSelected` properties.
  - `mandatory`: A boolean indicating whether the parameter is mandatory.

- `onSubmit`: A function to be called when the form is submitted. It receives the updated form data as its argument.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Author

[Vivek Sharma](https://github.com/vivekssharma07)