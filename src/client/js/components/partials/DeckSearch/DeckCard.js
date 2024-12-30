import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Img from 'react-image';

import DeckTriggers from 'Components/DeckView/DeckTriggers';
import AttributesList from 'Partials/DeckSearch/AttributesList';
import FavoriteIcon from 'Partials/DeckSearch/FavoriteIcon';

import { generateCardImageLink } from 'Utils/cardshorthands';

const { Meta } = Card;

const DeckTitle = ({ name, userid: user, deckid }) => 
<div className="title">
	<div className="deckname"><a href={`/deck/${deckid}`} title={name}>{ name || 'Deck' }</a></div>
	<div> 
		{
			user ?
				<a className="user" href={`/user/${user.name}`}>{ user.name }</a>
			:
				<div>Anonymous</div>
		}
	</div>
</div>;

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
					title={DeckTitle(deck)} 
					description={deck.description || 'No Description'}
				/>
				<div style={{display:'flex', bottom: '15px', position: 'absolute', width: '100%'}}>
					<DeckTriggers triggers={deck.triggers} imageStyle={{width: '25px'}} limit={3} />
					<AttributesList attributes={deck.attributes} />
					<FavoriteIcon deck={deck} loggedin={loggedin} />
				</div>
			</Card>
		</div>

	)
}