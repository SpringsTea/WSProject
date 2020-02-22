import React, { useState } from 'react';
import CardSlot from "./CardSlot";

export default function Clock({ cards }) {

	return (
		<div className={`clock cards-stacked`}>
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
			<CardSlot />
		</div>
	)
}