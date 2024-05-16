import React, { useEffect } from 'react';

export const CheckboxRenderer = ({ value, column, node }) => {
 
  const checkedHandler = (e) => {
    const checked = e.target.checked;
    const colId = column.colId;

    node.setDataValue(colId, checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        onChange={checkedHandler}
        checked={node?.data?.isSelected}
      />
      <span>{value}</span>
    </div>
  );
};