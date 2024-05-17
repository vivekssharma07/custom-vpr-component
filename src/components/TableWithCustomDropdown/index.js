import React, { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button } from '@salt-ds/core';

export const TableWithCustomDropdown = ({ param, handleChange }) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [isCheckBoxSelected, setCheckboxSelected] = useState('');

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Select All",
      field: "displayName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
    }
  ]);

  useEffect(() => {
    if (param?.values?.length) {
      setRowData(param.values);
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
    console.log("handleSelectionChanged")
    const selectedNodes = e.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData) {
      handleChange(param.parameter.parameterName, selectedData)
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: '260px', width: '250px' }}>
      <AgGridReact
        // onGridReady={({ api }) => {
        //   //setGridApi(api);
        //   //api.sizeColumnsToFit();
        // }}
        onGridReady={handleGridReady}

        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection='multiple'
        onFirstDataRendered={onFirstDataRendered}
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

