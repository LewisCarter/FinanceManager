import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('Ensure that the dashboard is protected and shows the login form', () => {
	render(<App />, { wrapper: MemoryRouter })
	
	expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});

test('Ensure that a 404 error is thrown when accessing an incorrect path', () => {
	window.history.pushState({}, 'Page', '/abc123')

	render(<App/>, { wrapper: BrowserRouter })
	
	expect(screen.getByText(/Whoops! It looks like the page you've requested doesn't exist./i)).toBeInTheDocument();
});