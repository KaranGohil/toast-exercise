import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
	render(<App />);

	const heading = screen.getByRole('heading', { name: /toast exercise/i });
	expect(heading).toBeInTheDocument();
});

test('clicking on New Submission Button renders the toast', async () => {
	render(<App />);

	const newSubmissionButton = screen.getByText('New Submission');

	fireEvent.click(newSubmissionButton);

	await waitFor(() => {
		const toast = screen.getByText('LIKE');
		expect(toast).toBeInTheDocument();
	});
});
