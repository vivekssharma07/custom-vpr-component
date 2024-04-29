import React, { useState } from 'react';
import { TextField, Checkbox, Select, MenuItem, Button, FormControl, InputLabel, FormControlLabel, Grid } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

const FormComponent = ({ fields, onSubmit }) => {
  const initialFormState = Object.fromEntries(
    fields.map((field) => [field.name, field.type === 'checkbox' ? false : ''])
  );
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={<Checkbox />}
                label={field.label}
                name={field.name}
                checked={formData[field.name]}
                onChange={handleChange}
              />
            ) : field.type === 'select' ? (
              <FormControl fullWidth>
                <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                <Select
                  labelId={`${field.name}-label`}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : field.type === 'date' ? (
              <>Test</>
                // <DatePicker
                //   label={field.label}
                //   value={formData[field.name]}
                //   onChange={(date) => handleDateChange(date, field.name)}
                //   renderInput={(params) => <TextField {...params} fullWidth />}
                // />
            ) : (
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent

