import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../../../App';

describe('Bank Account Listing', () => {
	test('Ensure that the bank accounts page is protected and shows the login form', () => {
		window.history.pushState({}, 'Bank accounts', '/banks');

		render(<App />, { wrapper: BrowserRouter })
		
		expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
	});
});