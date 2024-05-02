import React, { useState } from 'react';
import { ListNext, ListItem } from '@salt-ds/lab';
import { Button, FlowLayout, FormFieldLabel, StackLayout } from '@salt-ds/core';
import { DoubleChevronRightIcon, DoubleChevronLeftIcon } from '@salt-ds/icons';

const initialValues = {
  left: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  right: ['Item A', 'Item B']
};

export const LeftRightComponent = () => {
  const [left, setLeft] = useState(initialValues.left);
  const [right, setRight] = useState(initialValues.right);
  const [selectedLeftItem, setSelectedLeftItem] = useState(null);
  const [selectedRightItem, setSelectedRightItem] = useState(null);

  const moveItem = (source, destination, item) => {
    const newSource = source.filter(value => value !== item);
    const newDestination = [...destination, item];
    return { newSource, newDestination };
  };

  const handleMoveRight = () => {
    if (selectedLeftItem) {
      const { newSource, newDestination } = moveItem(left, right, selectedLeftItem);
      setLeft(newSource);
      setRight(newDestination);
      setSelectedLeftItem(null);
    }
  };

  const handleMoveLeft = () => {
    if (selectedRightItem) {
      const { newSource, newDestination } = moveItem(right, left, selectedRightItem);
      setRight(newSource);
      setLeft(newDestination);
      setSelectedRightItem(null);
    }
  };

  return (
    <FlowLayout>
      <StackLayout direction="column">
        <FormFieldLabel>Left List</FormFieldLabel>
        <ListNext className="list-next left-list" style={styles.list}>
          {left.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => setSelectedLeftItem(item)}
              style={selectedLeftItem === item ? styles.selected : styles.listItem}
            >
              {item}
            </ListItem>
          ))}
        </ListNext>
      </StackLayout>
      <StackLayout direction="column" gap={3} style={{ marginTop: '50px' }}>
        <Button onClick={handleMoveRight} className="arrow"><DoubleChevronRightIcon /></Button>
        <Button onClick={handleMoveLeft} className="arrow"><DoubleChevronLeftIcon /></Button>
      </StackLayout>
      <StackLayout direction="column">
        <FormFieldLabel>Right List</FormFieldLabel>
        <ListNext className="list-next right-list" style={styles.list}>
          {right.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => setSelectedRightItem(item)}
              style={selectedRightItem === item ? styles.selected : styles.listItem}
            >
              {item}
            </ListItem>
          ))}
        </ListNext>
      </StackLayout>
    </FlowLayout>
  );
};

const styles = {
  list: {
    height: '150px',
    width: '200px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
  },
  listItem: {
    height: '40px',
    lineHeight: '40px',
    cursor: 'pointer',
  },
  selected: {
    height: '40px',
    lineHeight: '40px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0', // Highlight selected item
    borderRadius: '2px',
  },
};

