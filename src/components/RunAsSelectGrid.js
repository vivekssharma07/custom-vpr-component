import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const SelectListAgGrid = (props) => {
  const {name , values , handleChange ,selectedValues , valueProp , displayProps } = props;


  const gridStyle = useMemo(() => ({ height: '300px', width: '250px' }), []);
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Select All',
        field: 'displayName',
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection:true,
        cellRenderer: 'CustomComponent',
        width: 250,
      },
    ],
    []
  );

  useEffect(() => {
    if (values?.length) {
      setRowData(values.map((item, index) => ({ ...item, id: index })));
    }
  }, [values]);

  const handleSelectionChanged = (params) => {
    const selectedData = params.api.getSelectedNodes().map((node) => node.data);
    handleChange(name, selectedData);
  };

  const handleSelectAllChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = [];
      gridApi.forEachNode((node) => {
        if (node.isSelected()) {
          selectedNodes.push(node.data);
        }
      });
      handleChange(name, selectedNodes);
    }
  }, [gridApi, name, handleChange]);

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        onGridReady={(params) => setGridApi(params.api)}
        columnDefs={columnDefs}
        rowData={values}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        onSelectionChanged={handleSelectionChanged}
      />
    </div>
  );
};
