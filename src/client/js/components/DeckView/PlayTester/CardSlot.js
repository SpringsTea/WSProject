import React, { useState } from 'react';

export default function CardSlot({ name, rested = false, card }) {

	//const [state, setState] = useState(attributes);

	return (
		<div className="card-slot-wrapper">
			<div className={`card-slot ${ rested ? 'rested' : '' }`}>
				{ name || 'Card Zone' }
			</div>
		</div>
	)
}