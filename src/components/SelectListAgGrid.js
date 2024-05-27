import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button, Checkbox } from '@salt-ds/core';

const CustomComponent = ({ data, api }) => {
  const [checked, setChecked] = useState(data.isSelected);

  const onCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);

    const nodesToUpdate = [];
    api.forEachNode((node) => {
      if (node.data.id === data.id) {
        node.data.isSelected = isChecked;
        nodesToUpdate.push(node);
      }
    });

    api.redrawRows({ rowNodes: [nodesToUpdate] });
   
  };

  useEffect(() => {
    setChecked(data.isSelected);
  }, [data.isSelected]);

  return (
    <StackLayout gap={1} direction="row" align='center'>
      <Checkbox
        checked={checked}
        onChange={onCheckboxChange}
      />
      <span>{data.displayName}</span>
    </StackLayout>
  );
};

export const SelectListAgGrid = ({ param, handleChange }) => {
  const [rowData, setRowData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const gridStyle = useMemo(() => ({ height: "260px", width: "250px" }), []);

  const columnDefs = useMemo(() => [
    {
      headerName: "Select All",
      field: "displayName",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      cellRendererSelector: () => {
        return {
          component: CustomComponent,
          params: param
        }
      }
    }
  ], [param]);

  useEffect(() => {
    if (param?.values?.length) {
      setRowData(param.values.map((item, index) => ({ ...item, id: index })));
    }
  }, [param?.values]);

  const addItemToList = () => {
    if (newItemName.trim() !== '') {
      const newItem = { displayName: newItemName, parameterValue: newItemName, isSelected: false };
      setRowData([...rowData, newItem]);
      handleChange(param.parameter.parameterName, newItem.parameterValue);
      setNewItemName('');
    }
  };

  const handleSelectionChanged = (params) => {
    const nodesToSelect = [];
    params.api.forEachNode((node) => {
      if (node.data && node.data.isSelected) {
        nodesToSelect.push(node);
      }
    });
    const selectedData = nodesToSelect.map(node => node.data);
    handleChange(param.parameter.parameterName, selectedData);
  }

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        onRowClicked={handleSelectionChanged}
        suppressRowClickSelection={true} // Disables built-in row selection
        suppressCheckboxSelection={true} // Disables built-in checkbox selection
      />
      {param?.parameter?.parameterName === 'inputList' && (
        <StackLayout gap={1} direction="vertical" style={{ marginTop: '5px' }}>
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new item name"
          />
          <Button onClick={addItemToList} style={{ width: '150px' }}>Add Item</Button>
        </StackLayout>
      )}
    </div>
  );
};
