import React, { useState } from 'react';
import CardSlot from "./CardSlot";

export default function Hand({ cards }) {

	return (
		<div className={`hand cards-stacked`}>
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
		</div>
	)
}