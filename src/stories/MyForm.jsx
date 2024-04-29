import React from 'react';
import FormComponent from '../components/FormComponent';

const MyForm = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
    // Add your form submission logic here
  };

  const fields = [
    { name: 'text', type: 'text', label: 'Text' },
    { name: 'checked', type: 'checkbox', label: 'Checked' },
    { name: 'select', type: 'select', label: 'Select', options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]},
    { name: 'date', type: 'date', label: 'Date' },
  ];

  return (
    <FormComponent fields={fields} onSubmit={handleSubmit} />
  );
};

export default MyForm;
