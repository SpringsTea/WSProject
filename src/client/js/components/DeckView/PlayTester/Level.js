import React, { useState } from 'react';
import CardSlot from "./CardSlot";

export default function Level({ cards }) {

	return (
		<div className={`level cards-stacked`}>
			<CardSlot rested={true} name="1" />
			<CardSlot rested={true} name="2" />
			<CardSlot rested={true} name="3" />
		</div>
	)
}