import React, { Component } from 'react';
import { Card, Avatar, Icon, Badge } from 'antd';
import Img from 'react-image';

import AttributesList from 'Partials/DeckSearch/AttributesList';

import { favoriteDeck } from 'Utils/api';
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

class DeckCard extends Component {

	state = {
		favoritecount: 0
	}

	handleFavorite = async() =>{
		const { deck } = this.props;
		const res = await favoriteDeck(deck.deckid)
		
		if(res.success === true){
			this.setState({favoritecount: res.favoritecount});
		}
	}

	ComponentWillMount(){
		const { favoritecount } = this.props;
		this.setState({favoritecount})
	}

	render(){
		const { handleFavorite } = this;
		const { deck } = this.props; 
		const { favoritecount } = this.state;
		return(
			<div className="container-deckcard">
				<Card
					cover={
						<div className="deck-image">
							<a href={`/deck/${deck.deckid}`}>
								<Img
								src={[
								  generateCardImageLink(deck.cards[0]),
								]}
								unloader={<Icon className="image-not-found" type="question-circle" />}
								/>
							</a>
						</div>
					}
				>
					<Meta 
						title={DeckTitle(deck)} 
						description={deck.description || 'No Description'}
					/>
					<AttributesList attributes={deck.attributes} />
					<div className="deck-favorite clickable" onClick={handleFavorite}>
						<span className="fa-stack fa-2x">
							<i className="far fa-star fa-stack-2x"></i>
							<strong className="fa-stack-1x favorite-count">{favoritecount}</strong>
						</span>
					</div>
				</Card>
			</div>
		)
	}
}

export default DeckCard;