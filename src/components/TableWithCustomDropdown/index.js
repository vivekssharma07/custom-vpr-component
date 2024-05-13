import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button } from '@salt-ds/core';

export const TableWithCustomDropdown = ({ param, handleChange }) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(param ? param.values : []);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    if (param) {
      setRowData(param.values);
    }
  }, [param]);

  useEffect(() => {
    if (gridApi) {
      // Pre-select checkboxes based on isSelected property
      gridApi.forEachNode(node => {
        console.log("Node Data ",node.data)
        if (node.data.isSelected) {
          node.setSelected(true);
        }
      });
    }
  }, [gridApi]);

  // Column definitions for ag-Grid
  const columnDefs = [
    {
      headerName: param && param.parameter.displayName,
      field: 'displayName',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      floatingFilter: param && param?.parameter?.parameterName === 'inputList',
      filter: param && param?.parameter?.parameterName === 'inputList',
    },
  ];

  // Add new item to the list
  const addItemToList = () => {
    if (newItemName.trim() !== '') {
      const newItem = { displayName: newItemName, parameterValue: newItemName, isSelected: false };
      setRowData([...rowData, newItem]);
      handleChange(param.parameter.parameterName, newItem.parameterValue);
      setNewItemName('');
    }
  };

  const handleSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData) {
      handleChange(param.parameter.parameterName, selectedData)
    }
  };

  

  return (
    <div className="ag-theme-alpine" style={{ height: '260px', width: '250px' }}>
      <AgGridReact
        onGridReady={({ api }) => {
          setGridApi(api);
          api.sizeColumnsToFit();
        }}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        onSelectionChanged={handleSelectionChanged}
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
