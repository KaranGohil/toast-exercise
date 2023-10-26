import React, { useEffect, useState } from 'react';
import {
	Stack,
	Box,
	Button,
	CircularProgress,
	Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

import { fetchLikedFormSubmissions } from './service/mockServer';
import { ItemCard } from './components/ItemCard/ItemCard';

export default function Content() {
	const [loading, setLoading] = useState(false);
	const [likedForms, setLikedForms] = useState([]);

	const getFormData = async () => {
		setLoading(true);
		try {
			const likedFormSubmissions = await fetchLikedFormSubmissions();
			setLikedForms(likedFormSubmissions.formSubmissions);
			setLoading(false);
		} catch (error) {
			window.alert('Error fetching the liked form:', error)
			setLoading(false);
		}
	};

	useEffect(() => {
		getFormData();
	}, []);

	return (
		<>
			<Box sx={{ marginTop: 3, marginX: 3 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h4">Liked Form Submissions</Typography>
					<Button variant='contained' startIcon={<ReplayIcon />} onClick={() => getFormData()}>
						Refresh
					</Button>
				</Box>
				{loading ? (
					<Box
						sx={{ display: 'flex', paddingTop: 3, justifyContent: 'center' }}
					>
						<CircularProgress />
					</Box>
				) : (
					<Stack sx={{ paddingTop: 3, overflowY: 'auto' }} spacing={2}>
						{likedForms.length === 0 ? (
							<Typography
								variant="body1"
								sx={{ fontStyle: 'italic', marginTop: 1 }}
							>
								No liked submission
							</Typography>
						) : (
							likedForms.map((likedForm, index) => {
								return <ItemCard key={index} likedForm={likedForm} />;
							})
						)}
					</Stack>
				)}
			</Box>
		</>
	);
}
