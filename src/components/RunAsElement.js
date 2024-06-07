import { FormField, FormFieldLabel } from "@salt-ds/core";
import { RunAsDropdown } from "./RunAsDropdown";

export const RunAsElement = (props) => {
    const {name,values,handleChange,label,type,helper,selectedProps,valueProp,displayProp} = props;
    const selectedValues = values?.filter((val) => val[selectedProps].map((val) => val[valueProp]))

    const handleValueChange = (name,value) => {
        handleChange(name,value)
    }

    return (
        <FormField key={name}>
            <FormFieldLabel>{label}</FormFieldLabel>
            {type === 'dropdown' && <RunAsDropdown name={name} values={values} selectedValues={selectedValues} 
            handleChange={handleValueChange}/>}
            
        </FormField>
    )

}