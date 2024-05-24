import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button, Checkbox } from '@salt-ds/core';

const CustomHeader = ({ api, column }) => {
  const [checked, setChecked] = useState(false);

  const onCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    api.forEachNode((node) => node.setSelected(isChecked));
  };

  return (
    <div className="custom-header">
      <Checkbox
        checked={checked}
        onChange={onCheckboxChange}
      />
      <span>{column.colDef.headerName}</span>
    </div>
  );
};

const CustomComponent = ({ value, api }) => {
  const [checked, setChecked] = useState(value.isSelected);

  const onCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    const node = api.getRowNode(value.id);
    if (node) {
      node.setSelected(isChecked);
    }
  };

  useEffect(() => {
    setChecked(value.isSelected);
  }, [value.isSelected]);

  return (
    <div className="custom-component">
      <Checkbox
        checked={checked}
        onChange={onCheckboxChange}
      />
      <span>{value.displayName}</span>
    </div>
  );
};

export const TableWithCustomDropdown = ({ param, handleChange }) => {
  const [rowData, setRowData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const gridStyle = useMemo(() => ({ height: "260px", width: "250px" }), []);

  const columnDefs = useMemo(() => [
    {
      headerName: "Select All",
      field: "displayName",
      headerComponentFramework: CustomHeader,
      cellRendererFramework: CustomComponent,
    }
  ], []);

  useEffect(() => {
    if (param?.values?.length) {
      console.log("Use Effect ");
      setRowData(param.values.map((item, index) => ({ ...item, id: index })));
    }
  }, [param?.values]);

  const onFirstDataRendered = useCallback((params) => {
    const nodesToSelect = [];
    params.api.forEachNode((node) => {
      if (node.data && node.data.isSelected === true) {
        nodesToSelect.push(node);
      }
    });
    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  }, []);

  const addItemToList = () => {
    if (newItemName.trim() !== '') {
      const newItem = { displayName: newItemName, parameterValue: newItemName, isSelected: false };
      setRowData([...rowData, newItem]);
      handleChange(param.parameter.parameterName, newItem.parameterValue);
      setNewItemName('');
    }
  };

  const handleSelectionChanged = (e) => {
    console.log("handleSelectionChanged");
    const selectedNodes = e.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData) {
      handleChange(param.parameter.parameterName, selectedData);
    }
  };

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        onSelectionChanged={handleSelectionChanged}
        onFirstDataRendered={onFirstDataRendered}
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
