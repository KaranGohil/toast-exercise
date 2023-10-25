import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

import { onMessage } from '../service/mockServer';
import { Slide, Typography } from '@mui/material';

const Toast = () => {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

	const receiveFormData = (formSubmission) => {
		//const { email, firstName, lastName } = formSubmission.data;
		setFormData(formSubmission.data);
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

	const handleLike = () => {
		console.log('I was liked');
	};

	const action = (
		<>
			<Button color="secondary" size="small" onClick={handleLike}>
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
	);

    const message = () => {
        if(!formData) return 'No data received'

        const {firstName, lastName, email} = formData

        return (
            <Typography>
                {firstName} {lastName}
                <br/>
                Email: {email}
            </Typography>
        )
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
