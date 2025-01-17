import React, { Component } from 'react';
import { Card, Row, Col, Tag, Button, Tooltip, Popconfirm, message } from 'antd';
import {
	ForkOutlined,
	EditOutlined
} from '@ant-design/icons';

import DeckStats from './DeckStats';
import DeckTriggers from './DeckTriggers';
import AttributesList from 'Partials/DeckSearch/AttributesList';
import FavoriteIcon from 'Partials/DeckSearch/FavoriteIcon';
import DeckExportMenu from './DeckExportMenu';

import { claimDeck, deleteDeck } from 'Utils/api';
import { FormatDateString } from 'Utils/stringfunctions';

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
		const tournament = deck.attributes.find( (a) => a.name === "Tournament" ) || null

		return(
			<Card className="deck-header">
				<div>
					<div className="flex-container" style={{flexWrap: 'wrap'}}>
						<h2 
							className="deck-name"
							style={{margin: '0px'}}
						>
							{deck.name}
						</h2>
						<AttributesList attributes={deck.attributes} />
						{
							tournament &&
							<h2 className="deck-score">{ `${tournament.record.wins} Wins | ${tournament.record.losses} Losses`}</h2>
						}
						<FavoriteIcon loggedin={loggedin} deck={deck} />
						<div className="controls">
							<Button.Group>
								<Tooltip placement="top" title="Copy this deck and save it as your own">
									<Button type="primary" icon={<ForkOutlined />}
									href={`/builder/fork/${deck.deckid}`}>
										Fork
									</Button>
								</Tooltip>
							{
								deckuser && deckuser._id === currentuser &&
								<Button type="primary" icon={<EditOutlined />}
								href={`/builder/edit/${deck.deckid}`}>
									Edit
								</Button>
							}
								<DeckExportMenu cards={cards} deck={deck} />
							{
								deckuser && deckuser._id === currentuser &&
								<Popconfirm placement="bottomLeft" title={"Are you sure?"} onConfirm={deletedDeck} okText="Yes" cancelText="No">
									<Button className="danger" type="primary">
										Delete
									</Button>
								</Popconfirm>
							}
							</Button.Group>
						</div>						
					</div>
					<DeckTriggers triggers={deck.triggers}/>
					<h3>
						{
							deckuser ?
							<a className="user" href={`/user/${deckuser.name}`}>{ deckuser.name }</a>
							:
							<span>Anonymous</span>
						}
					</h3>
					<div style={{color: '#cccccc'}}>
						Last Updated: { 
							FormatDateString(deck.datemodified, {
							    weekday: undefined,
							    month: "numeric",
							    timeZoneName: undefined,
							    hour: undefined,
							    minute: undefined
							}) 
						}
					</div>
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
					<Col xl={6} className="display set-tags">
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