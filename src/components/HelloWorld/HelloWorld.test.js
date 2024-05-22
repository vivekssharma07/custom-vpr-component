// src/components/HelloWorld.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { HelloWorld } from './HelloWorld'; // Adjust the import based on how you export the component

test('renders Hello, World! and changes text on button click', () => {
    render(<HelloWorld />);

    const heading = screen.getByText(/Hello, World!/i);
    expect(heading).toBeInTheDocument(); // Use toBeInTheDocument

    const button = screen.getByText(/Change Text/i);

    act(() => {
        fireEvent.click(button);
    });

    const newHeading = screen.getByText(/Hello, React Testing Library!/i);
    expect(newHeading).toBeInTheDocument(); // Use toBeInTheDocument
});
