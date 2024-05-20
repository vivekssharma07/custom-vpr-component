import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button } from '@salt-ds/core';

export const TableWithCustomDropdown = ({ param, handleChange }) => {
  const [rowData, setRowData] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const gridStyle = useMemo(() => ({ height: "260px", width: "250px" }), []);

  const columnDefs = useMemo(() => [
    {
      headerName: "Select All",
      field: "displayName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
    }
  ], []);

  useEffect(() => {
    if (param?.values?.length) {
      console.log("Use Effect ")
      setRowData(param.values);
    }
  }, []);

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
    console.log("handleSelectionChanged",)
    const selectedNodes = e.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData) {
      handleChange(param.parameter.parameterName, selectedData)
    }
  }

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        onGridReady={({ api }) => {
          setGridApi(api);
          api.sizeColumnsToFit();
        }}
        columnDefs={columnDefs}
        rowData={param?.values}
        rowSelection="multiple"
        onSelectionChanged={handleSelectionChanged}
        onFirstDataRendered={onFirstDataRendered}
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