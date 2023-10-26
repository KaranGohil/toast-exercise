import React, { useEffect, useState } from 'react';
import {
	Stack,
	Box,
	Button,
	CircularProgress,
	Typography,
	Snackbar,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

import { fetchLikedFormSubmissions } from './service/mockServer';
import { ItemCard } from './components/ItemCard/ItemCard';
import Alert from './components/ItemCard/Alert/Alert';

export default function Content() {
	const [loading, setLoading] = useState(false);
	const [likedFormSubmissions, setLikedFormSubmissions] = useState([]);
	const [open, setOpen] = useState(false);

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const getAllLikedFormSubmissions = async () => {
		setLoading(true);
		try {
			const allLikedFormSubmissions = await fetchLikedFormSubmissions();
			setLikedFormSubmissions(allLikedFormSubmissions.formSubmissions);
			setLoading(false);
		} catch (error) {
			setOpen(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllLikedFormSubmissions();
	}, []);

	return (
		<>
			<Box sx={{ marginTop: 3, marginX: 3 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h4">Liked Form Submissions</Typography>
					<Button
						variant="contained"
						startIcon={<ReplayIcon />}
						onClick={() => getAllLikedFormSubmissions()}
					>
						Refresh
					</Button>
				</Box>
				{loading ? (
					<Box
						sx={{
							marginTop: '35%',
							marginLeft: '50%',
							paddingTop: 3,
							width: '100%',
							height: '100vh',
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<Stack sx={{ paddingTop: 3, overflowY: 'auto' }} spacing={2}>
						{likedFormSubmissions.length === 0 ? (
							<Typography
								variant="body1"
								sx={{ fontStyle: 'italic', marginTop: 1 }}
							>
								No liked submission
							</Typography>
						) : (
							likedFormSubmissions.map((likedFormSubmission, index) => {
								return (
									<ItemCard
										key={index}
										likedFormSubmission={likedFormSubmission}
									/>
								);
							})
						)}
					</Stack>
				)}
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Failed to reterive liked form submissions. Please try again!
				</Alert>
			</Snackbar>
		</>
	);
}
