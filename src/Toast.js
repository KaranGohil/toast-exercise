import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
	Slide,
	Typography,
	Button,
	CircularProgress,
	IconButton,
	Snackbar,
} from '@mui/material';

import { onMessage, saveLikedFormSubmission } from './service/mockServer';

/*
 We have local state with useeffect here because we want only the toast to rerender
 when the new message arrives
 This toast has a single responsibility of show new submission
 */
const Toast = () => {
	const [open, setOpen] = useState(false); 
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});

	const isMounted = useRef(true);

	const receiveFormData = (formSubmission) => {
		if (isMounted.current) {
			setFormData(formSubmission);
			setOpen(true);
		}
	};

	useEffect(() => {
		onMessage(receiveFormData);

		return () => {
			isMounted.current = false;
		};
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
			window.alert('Failed to save the liked form:', error)
			setLoading(false);
		}
		setOpen(false);
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
