import React, { Component } from 'react';
import { Card, Row, Col, Tag, Button, Tooltip, message } from 'antd';

import { claimDeck } from 'Utils/api';

class DeckHeader extends Component {

	sumCardQuantity(cards, type ='CH'){
		return cards.filter( (card) => card.cardtype === type).length;
	}

	countCardLevel(cards, level = 0){
		return cards.filter( (card) => card.level === level && card.cardtype !== 'CX' ).length;
	}

	claimDeck = async() =>{
		const { deck } = this.props;
		const res = await claimDeck(deck.deckid);	
		
		if(res.success === true){
			window.location.reload();
		}
		else{
			message.error(res.message)
		}
	}

	render(){
		const { sumCardQuantity, countCardLevel, claimDeck } = this;
		const { cards, deck, loggedin, currentuser } = this.props;
		const { userid: deckuser } = deck;

		return(
			<Card className="deck-header">
				<div>
					<div className="flex-container">
						<h2 className="deck-name">{deck.name}</h2>
						{
							(!deckuser && loggedin == 'true') &&
							<Tooltip title="Claim this deck as yours. This can not be undone" placement="bottom">
								<Button className="btn-claim" type="primary" icon="exclamation-circle" onClick={claimDeck}>
									Claim This Deck
								</Button>
							</Tooltip>
						}
						<div className="controls">
							{
								deckuser && deckuser._id === currentuser &&
								<Button type="primary" icon="edit"
								href={`/builder/edit/${deck.deckid}`}
								>
									Edit
								</Button>
							}
						</div>						
					</div>
					<h3>
						{
							deckuser ?
							<a className="user" href={`/user/${deckuser.name}`}>{ deckuser.name }</a>
							:
							<span>Anonymous</span>
						}
					</h3>
				</div>
				<Row gutter={6}>
					<Col xl={6} className="display">
						<div>
							<span>
								Characters : { sumCardQuantity(cards, 'CH') } {' '}
							</span>
							<span>
								Events : { sumCardQuantity(cards, 'EV') } {' '}
							</span>
							<span>
								Climaxes : { sumCardQuantity(cards, 'CX') }
							</span>
						</div>
						<div>
							(
							{
								[0,1,2,3].map( (level) => <span key={level}> Level {level}: { countCardLevel(cards, level) }{level !== 3 && ','} </span> )
							}
							)
						</div>
					</Col>
					<Col xl={12} className="display">
						Description: 
						<div className="deck-description">
						{ deck.description }
						</div>
					</Col>
					<Col className="display">
						Sets: { deck.sets.map( (set) => <Tag key={set._id}>{`${set.name}(${set.set}/${set.side}${set.release})`}</Tag> ) }
					</Col>
				</Row>
			</Card>
		)
	}
}

export default DeckHeader;