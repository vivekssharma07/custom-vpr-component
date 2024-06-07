import { Dropdown,Option } from "@salt-ds/core";

export const RunAsDropdown = (props) => {
    const {name , values , handleChange ,selectedValues , valueProp , displayProps } = props;

    const handleSelectionChange = (event,newSelected) => {
        handleChange(name,newSelected)
    }

    const valueToDisplay = (selectedValues,values) => {
        let value = values.find((val) => selectedValues.includes(val[valueProp]))
        return value ? value[displayProps] : null;
    }

    return (
        <Dropdown 
            key={name}
            onSelectionChange={handleSelectionChange}
            defaultSelected={selectedValues}
            selected={selectedValues}
            value={valueToDisplay(selectedValues,values)}
          >
            {values?.map((option) => {
                <Option key={name + option[valueProp]} value={option[valueProp]}>
                    {option[displayProps]}
                </Option>
            })}

          </Dropdown>  
    )
}