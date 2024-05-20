import React, { useState, useEffect, useMemo } from 'react';
import { ListNext, ListItem } from '@salt-ds/lab';
import { StackLayout, Input, Button, Checkbox } from '@salt-ds/core';

export const MultiSelectList = ({ param, handleChange }) => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (param?.values?.length) {
      setItems(param.values);
      const initiallySelected = param.values.filter(item => item.isSelected);
      setSelectedItems(initiallySelected);
    }
  }, [param?.values]);

  const handleItemChange = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.parameterValue === item.parameterValue);
    const newSelectedItems = isSelected
      ? selectedItems.filter(selectedItem => selectedItem.parameterValue !== item.parameterValue)
      : [...selectedItems, item];

    setSelectedItems(newSelectedItems);
    handleChange(param.parameter.parameterName, newSelectedItems);
  };

  const addItemToList = () => {
    if (newItemName.trim()) {
      const newItem = { displayName: newItemName, parameterValue: newItemName, isSelected: true };
      setItems([...items, newItem]);
      handleChange(param.parameter.parameterName, [newItem]);
      setNewItemName('');
    }
  };

  const handleSelectAllChange = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
      handleChange(param.parameter.parameterName, []);
    } else {
      setSelectedItems(items);
      handleChange(param.parameter.parameterName, items);
    }
  };

  const allSelected = useMemo(() => selectedItems.length === items.length, [selectedItems, items]);

  return (
    <StackLayout direction="column" gap={2}>
      <ListNext style={{ height: "260px", width: "250px", overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
        <ListItem style={{ ...styles.listItem, ...styles.selectAllItem }}>
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAllChange}
            label={<span style={{ fontWeight: 'bold' }}>Select All</span>}
          />
        </ListItem>
        {items.map((item, index) => (
          <ListItem key={index} style={{ ...styles.listItem, ...(selectedItems.some(selectedItem => selectedItem.parameterValue === item.parameterValue) && styles.selectedItem) }}>
          <Checkbox
              checked={selectedItems.some(selectedItem => selectedItem.parameterValue === item.parameterValue)}
              onChange={() => handleItemChange(item)}
              label={item.displayName}
            />
          </ListItem>
        ))}
      </ListNext>
      {param?.parameter?.parameterName === 'inputList' && (
        <StackLayout direction="vertical" gap={1} style={{ marginTop: '5px' }}>
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new item name"
          />
          <Button onClick={addItemToList} style={{ width: '150px' }}>Add Item</Button>
        </StackLayout>
      )}
    </StackLayout>
  );
};

const styles = {
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px', // Increased height
    borderBottom: '1px solid #ccc',
  },
  selectAllItem: {
    fontWeight: 'bold',
  },
  selectedItem: {
    backgroundColor: '#e0f7fa', // Highlight selected item
  }
};