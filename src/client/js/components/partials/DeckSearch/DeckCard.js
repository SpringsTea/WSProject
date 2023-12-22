import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Img from 'react-image';

import AttributesList from 'Partials/DeckSearch/AttributesList';
import FavoriteIcon from 'Partials/DeckSearch/FavoriteIcon';

import { generateCardImageLink } from 'Utils/cardshorthands';

const { Meta } = Card;

export default function DeckCard({ deck, loggedin }) {

	return (
		<div className="container-deckcard">
			<Card
				cover={
					<div className="deck-image">
						<a href={`/deck/${deck.deckid}`}>
							<Img
							src={[
							  generateCardImageLink(deck.cards[0]),
							]}
							unloader={<QuestionCircleOutlined className="image-not-found"/>}
							/>
						</a>
					</div>
				}
			>
				<Meta 
					description={deck.description || 'No Description'}
				/>
				<AttributesList attributes={deck.attributes} />
				<FavoriteIcon deck={deck} loggedin={loggedin} />
			</Card>
		</div>

	)
}