import React, { Component } from 'react';
import { Row, Col, Button, Badge, Tooltip } from 'antd';
import { 
  FileSearchOutlined,
  QuestionCircleOutlined,
  LinkOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import Img from 'react-image';

import Property from '../partials/Builder/Card/Property';

import { generateCardImageLink, generateCardCode } from 'Utils/cardshorthands';
import { addDeckCard, removeDeckCard } from 'Actions/BuilderActions';


const getCardUrl = (card) => {
	if( card.game === 'ROSE' ){
		return `https://ws-rose.com/cardlist/?cardno=${card.cardcode}`
	}
	if( card.lang === 'JP' ){
		return `https://heartofthecards.com/code/cardlist.html?card=WS_${card.cardcode}`
	}
	else{
		return `https://en.ws-tcg.com/cardlist/list/?cardno=${card.cardcode}`
	}
}

class Card extends Component {
	render(){
		const { card, locale, locked, allowDeckControls = false, count = 0, onCardSelect = () => {} } = this.props;
		return(
			<div className={`container-card ${locked ? 'locked' : ''}`}>
				{
				card ?
				<div className="card">		
					<h2 className="card-name">
						<a target="_blank" href={getCardUrl(card)}
						>
							{locale.name || 'NaN'} <LinkOutlined />
						</a>
						<Tooltip title="Search for decks that include this card">
							<a target="_blank" href={`/?cards=${card._id}`}>
								<FileSearchOutlined
									style={{marginLeft: '4px', color: '#d6b600'}}
									className="clickable"
								/>
							</a>
						</Tooltip>
						{
							!!locale.source &&
							<Tooltip title="Translations for this card are unofficially provided by the community, and are subject to change">
								<QuestionCircleOutlined 
									style={{marginLeft:'4px'}} 
									//theme="filled" 
									className="locale-alert clickable" 
								/>
							</Tooltip>
						}
					</h2>
						
					<div className='cardimage clickable' onClick={() => onCardSelect(card)}>
						<Badge className={`card-quantity ${count < 1 ? 'hidden' : ''}`} count={count} offset={[-5, 10]}	
							color='black'
						>
							<Img
							    src={[
							      generateCardImageLink(card),
							    ]}
						    	unloader={<QuestionCircleOutlined className="image-not-found" />}
						  	/>
					  	</Badge>
					</div>
					{
						!!allowDeckControls &&
						<Button.Group className="deck-controls">
							<Button icon={<MinusOutlined />} className="danger" size="small" onClick={ () => removeDeckCard(card) }></Button>
							<Button icon={<PlusOutlined />} className="success" size="small" onClick={ () => addDeckCard(card) }></Button>
						</Button.Group>
					}
					{	
						locale.ability && locale.ability.length > 0 &&
						<div className="cardtext">
							{ locale.ability.map( (ability) => <div key={ability}>{ability}</div> ) }
						</div>
					}
					<div className="extra"> 
						<Row type='flex'>
							<Property name='Level' value={card.level} />
							<Property name='Cost' value={card.cost} />			
							<Property name='Trigger' value={ card.trigger.join(', ') } />			
							<Property name='Color' value={card.colour} />
							<Property name='Power' value={card.power} />
							<Property name='Soul' value={card.soul} />
							{
								locale.attributes.map( attribute => attribute.length > 1 &&//ignore empty traits
									<Property key={attribute} name='Trait' value={attribute} />)
							}
							<Property name='Card No' value={generateCardCode(card)} />
							<Property name='Rarity' value={card.rarity} />
						</Row>
					</div>
				</div>
				: 
				<div className="card">
					<span>No card found</span>
				</div>
				}
			</div>
		)
	}
}

export default Card;