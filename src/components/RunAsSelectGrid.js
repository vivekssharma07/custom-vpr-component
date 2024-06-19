import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const RunAsSelectGrid = (props) => {
  const { name, values, handleChange, selectedValues, valueProp, displayProps ,counter} = props;

  const gridStyle = useMemo(() => ({ height: '300px', width: '250px' }), []);
  const [gridApi, setGridApi] = useState(null);
  const [rowData,setRowData] = useState();

  const columnDefs = useMemo(
    () => [
      {
        headerName:"Select All",
        field: 'displayName',
        maxWidth: 300,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (values?.length) {
      setRowData(values);
    }
  }, [values]);

  useEffect(() => {
    console.log("Grid API ",gridApi)
    if (gridApi) {
      gridApi.forEachNode((node) => {
        if (selectedValues.includes(node.data.parameterValue)) {
          node.selectedThisNode(true)
        }
      })
    }
  }, [gridApi, rowData])

  const handleSelectionChange = (event) => {
    console.log("Grid API handleSelectionChange ",event.source)
    if (["SelectAll", "checkboxSelected"].includes(event.source)) {
      const selectedData = event.api.getSelectedRows();
      const selectedValues = selectedData?.length ? selectedData?.mao((row) => row[valueProp]) : []
      handleChange(name, selectedValues);
    }
  };

  const onFirstDataRendered = (params) => {
    params.api.forEachNode((node) => {
      if (selectedValues.includes(node.data.parameterValue)) {
        node.selectedThisNode(true)
      }
    })

    handleChange(name, [...selectedValues])
  }

  return (
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact
        key={counter}
        onGridReady={(params) => setGridApi(params.api)}
        columnDefs={columnDefs}
        rowData={values}
        rowSelection="multiple"
        onSelectionChanged={handleSelectionChange}
        onFirstDataRendered={onFirstDataRendered}
        data-testid="ag-grid" 
      />
    </div>
  );
};
