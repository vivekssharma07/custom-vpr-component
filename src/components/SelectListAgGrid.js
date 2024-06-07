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
  const gridStyle = useMemo(() => ({ height: "300px", width: "250px" }), []);
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = useMemo(() => [
    {
      headerName: "Select All",
      field: "displayName",
      headerCheckboxSelectionFilteredOnly: true,
      cellRendererSelector: () => {
        return {
          component: CustomComponent,
          params: param
        }
      },
      headerCheckboxSelection: params => {
        const displayedColumns = params.api.getAllDisplayedColumns();
        console.log(displayedColumns,"Paras ",params)
        return displayedColumns[0] === params.column;
      },
      width:250
    }
  ], [param]);

  useEffect(() => {
    if (param?.values?.length) {
      setRowData(param.values.map((item, index) => ({ ...item, id: index })));
    }
  }, [param?.values]);

  useEffect(() => {

  }, [])

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

  const handleSelectAllChanged = useCallback(() => {
    const selectedNodes = [];
    gridApi.forEachNode((node) => {
      if (node.isSelected()) {
        selectedNodes.push(node.data);
      }
    });
    handleChange(param.parameter.parameterName, selectedNodes);
  }, [gridApi, param, handleChange]);

  useEffect(() => {
    if (gridApi) {
      gridApi.addEventListener('selectAllChanged', handleSelectAllChanged);
    }
    return () => {
      if (gridApi) {
        gridApi.removeEventListener('selectAllChanged', handleSelectAllChanged);
      }
    };
  }, [gridApi, handleSelectAllChanged]);

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        onGridReady={(params) => setGridApi(params.api)}
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
