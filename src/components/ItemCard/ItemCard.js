import './itemcard.css';

import React from 'react';

export const ItemCard = (props) => {
	const { firstName, lastName, email } = props.likedForm.data;

	return (
		<div className="item-card-container">
			<p>
				{firstName} {lastName}
			</p>
			<p>{email}</p>
		</div>
	);
};
