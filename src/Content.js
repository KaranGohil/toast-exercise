import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

import { fetchLikedFormSubmissions } from './service/mockServer';
import { ItemCard } from './components/ItemCard';

export default function Content() {
	const [loading, setLoading] = useState(false);
	const [likedForms, setLikedForms] = useState(null);

	const getFormData = async () => {
		setLoading(true);
		try {
			const likedFormSubmissions = await fetchLikedFormSubmissions();
			setLikedForms(likedFormSubmissions.formSubmissions);
			setLoading(false);
		} catch (error) {
			console.log('could not fetch the liked forms');
			setLoading(false);
		}
	};

	useEffect(() => {
		getFormData();
	}, []);

	console.log(likedForms);

	return (
		<Box sx={{ marginTop: 3, marginX: 3 }}>
			<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
			<Typography variant="h4">Liked Form Submissions</Typography>
			<Button startIcon={<ReplayIcon />} onClick={()=> getFormData()}>Refresh</Button>
			</Box>
			{loading ? (
				<Box sx={{ display: 'flex', paddingTop: 3, justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<Stack sx={{ paddingTop: 3 }} spacing={2}>
					{!likedForms ? (
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
	);
}
