import React, { useEffect, useState } from 'react';
import {
	Stack,
	Box,
	Button,
	CircularProgress,
	Typography,
	Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ReplayIcon from '@mui/icons-material/Replay';

import { fetchLikedFormSubmissions } from './service/mockServer';
import { ItemCard } from './components/ItemCard/ItemCard';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Content() {
	const [loading, setLoading] = useState(false);
	const [likedForms, setLikedForms] = useState([]);
	const [open, setOpen] = useState(false);

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const getFormData = async () => {
		setLoading(true);
		try {
			const likedFormSubmissions = await fetchLikedFormSubmissions();
			setLikedForms(likedFormSubmissions.formSubmissions);
			setLoading(false);
		} catch (error) {
			setOpen(true);
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
					<Button
						variant="contained"
						startIcon={<ReplayIcon />}
						onClick={() => getFormData()}
					>
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
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Failed to reterive liked form submissions
				</Alert>
			</Snackbar>
		</>
	);
}
