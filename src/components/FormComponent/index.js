import React, { useState } from 'react';
import { GridLayout, Input, Checkbox, Dropdown, Button } from '@salt-ds/core';
import { DateInput } from '@salt-ds/lab';

const FormComponent = ({ fields, onSubmit }) => {

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      return { ...acc, [field.label]: field.value };
    }, {})
  );

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onSubmit handler with form data
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <GridLayout columns={2} gutter="space20">
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            {field.type === 'text' && (
              <Input
                label={field.label}
                value={formData[field.label]}
                onChange={(value) => handleChange(field.label, value)}
              />
            )}
            {field.type === 'checkbox' && (
              <Checkbox
                label={field.label}
                checked={formData[field.label]}
                onChange={(checked) => handleChange(field.label, checked)}
              />
            )}
            {field.type === 'dropdown' && (
              <Dropdown
                label={field.label}
                value={formData[field.label]}
                onChange={(value) => handleChange(field.label, value)}
                options={field.options.map((option) => ({ label: option, value: option }))}
              />
            )}
            {field.type === 'date' && (
              <DateInput
                label={field.label}
                value={formData[field.label]}
                onChange={(value) => handleChange(field.label, value)}
              />
            )}
          </React.Fragment>
        ))}
      </GridLayout>
      <Button variant="primary" type="submit">Submit</Button>
    </form>
  );
};

export default FormComponent;
