import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getByText('Learn React');
        expect(linkElement).toBeInTheDocument();
    });
});
