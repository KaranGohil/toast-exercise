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
import Alert from './components/ItemCard/Alert/Alert';

/*
 We have local state with useeffect here because we want only the toast to rerender
 when the new message arrives
 This toast has a single responsibility of show new submission
 */

const Toast = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newFormSubmission, setNewFormSubmission] = useState({});
	const [msgType, setMsgType] = useState('');

	const isMounted = useRef(true);

	const receiveFormData = (formSubmission) => {
		if (isMounted.current) {
			setNewFormSubmission(formSubmission);
			setMsgType('info');
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
			await saveLikedFormSubmission(newFormSubmission);
			setMsgType('success');
			setLoading(false);
		} catch (error) {
			setMsgType('error');
			setLoading(false);
		}
	};

	const action = (
		<>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					{msgType === 'info' && (
						<Button color="primary" size="small" onClick={handleLike}>
							LIKE
						</Button>
					)}
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
		if (!msgType) return 'No type was passed';
		if (!newFormSubmission.data) return 'No data received';

		switch (msgType) {
			case 'info':
				const { firstName, lastName, email } = newFormSubmission.data;
				return (
					<Typography>
						{firstName} {lastName}
						<br />
						Email: {email}
					</Typography>
				);
			case 'success':
				return <Typography>Liked form was saved!</Typography>;
			case 'error':
				return <Typography>Failed to save liked form!</Typography>;
			default:
				return 'Invalid message type';
		}
	};

	if (msgType !== 'info') {
		return (
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
			>
				<Alert onClose={handleClose} severity={msgType} sx={{ width: '100%' }}>
					{message()}
				</Alert>
			</Snackbar>
		);
	}
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
