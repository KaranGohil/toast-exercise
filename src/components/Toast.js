import React, { useState, useEffect } from 'react';

// (TODO) merger 
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import { onMessage, saveLikedFormSubmission } from '../service/mockServer';
import { Slide, Typography } from '@mui/material';
/*
 We have local state with useeffect here because we want only the toast to rerender
 when the new message arrives
 */
const Toast = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});

	const receiveFormData = (formSubmission) => {
		setFormData(formSubmission);
		setOpen(true);
	};

	useEffect(() => {
		// When the component mounts, onMessage is set up
		// As this is not a event listener, no clean up function required
		onMessage(receiveFormData);
	}, []);

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleLike = async () => {
		setLoading(true);
		try {
			await saveLikedFormSubmission(formData);
			setLoading(false);
		} catch (error) {
			console.log('maybe work with error to show in toast');
			setLoading(false);
		}
        setOpen(false)
	};

	const action = (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<Button color="primary" size="small" onClick={handleLike}>
						LIKE
					</Button>
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</>
			)}
		</>
	);

	const message = () => {
		if (!formData.data) return 'No data received';

		const { firstName, lastName, email } = formData.data;

		return (
			<Typography>
				{firstName} {lastName}
				<br />
				Email: {email}
			</Typography>
		);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			TransitionComponent={(props) => {
				return <Slide {...props} direction="up" />;
			}}
			open={open}
			onClose={handleClose}
			message={message()}
			action={action}
		/> 
	);
};

export default Toast;
