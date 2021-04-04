import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { BanksListing } from '../../Components/Money/banks.listing.component';

test('Ensure that the dashboard is protected and shows the login form', () => {
	render(<BanksListing />, { wrapper: MemoryRouter })
	
	expect(screen.getByText(/asdasd/i)).toBeInTheDocument();
});