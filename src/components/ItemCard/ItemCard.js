import './itemcard.css';

import React from 'react';

export const ItemCard = (props) => {
	const { firstName, lastName, email } = props.likedFormSubmission.data;

	return (
		<div className="item-card-container">
			<h3>
				{firstName} {lastName}
			</h3>
			<p>{email}</p>
		</div>
	);
};
