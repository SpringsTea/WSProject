import React, { Component } from 'react';
import { Card, Row, Col, Tag, Button, Tooltip, Popconfirm, message } from 'antd';
import DeckStats from './DeckStats';

import { claimDeck, deleteDeck } from 'Utils/api';

class DeckHeader extends Component {

	state = {
		stattoggle:false
	}

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

	deletedDeck = async() =>{
		const { deck } = this.props;
		let res = await deleteDeck(deck.deckid);

		if( res.data && res.data.success === true ){
			window.location = '/user';
		}
		else{
			message.error(res.data.message);
		}
	}

	render(){
		const { sumCardQuantity, countCardLevel, claimDeck, deletedDeck } = this;
		const { cards, deck, loggedin, currentuser } = this.props;
		const { stattoggle } = this.state;
		const { userid: deckuser } = deck;

		return(
			<Card className="deck-header">
				<div>
					<div className="flex-container">
						<h2 className="deck-name">{deck.name}</h2>
						<div className="controls">
							{
								deckuser && deckuser._id === currentuser &&
								<Button.Group>
									<Button type="primary" icon="edit"
									href={`/builder/edit/${deck.deckid}`}
									>
										Edit
									</Button>
									<Popconfirm placement="bottomLeft" title={"Are you sure?"} onConfirm={deletedDeck} okText="Yes" cancelText="No">
										<Button className="danger" type="primary">
											Delete
										</Button>
									</Popconfirm>
								</Button.Group>
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
						<a onClick={() => this.setState({stattoggle: !stattoggle})} >{`${stattoggle ? '-' : '+'} Deck Stats`}</a>
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
				{
					stattoggle === true &&
					<DeckStats cards={cards} deck={deck} />
				}
			</Card>
		)
	}
}

export default DeckHeader;