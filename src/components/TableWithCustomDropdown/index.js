import React, { forwardRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { StackLayout, Input, Button } from '@salt-ds/core';

export const TableWithCustomDropdown = forwardRef((props, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([
    { id: 1, headerName: 'Option 1' },
    { id: 2, headerName: 'Option 2' },
    { id: 3, headerName: 'Option 3' },
    { id: 4, headerName: 'Option 4' },
    { id: 5, headerName: 'Option 5' },
    { id: 6, headerName: 'Option 6' },
    // Add more sample data as needed
  ]);
  const [newItemName, setNewItemName] = useState('');

  // Column definitions for ag-Grid
  const columnDefs = [
    {
      headerName: 'Header',
      field: 'headerName',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      floatingFilter: true,
      filter: true, 
    },
  ];

  // Add new item to the list
  const addItemToList = () => {
    if (newItemName.trim() !== '') {
      const newItem = { id: rowData.length + 1, headerName: newItemName };
      setRowData([...rowData, newItem]);
      setNewItemName('');
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '300px' }}>
      <AgGridReact
        onGridReady={({ api }) => {
          setGridApi(api);
          api.sizeColumnsToFit();
        }}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      />
      <StackLayout gap={1} direction="vertical" style={{ marginTop: '15px',marginBottom:'15px' }}>
        <Input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item name"
        />
        <Button onClick={addItemToList} style={{ width: '150px' }}>Add Item</Button>
      </StackLayout>
    </div>
  );
});
