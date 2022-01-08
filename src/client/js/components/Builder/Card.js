import React, { Component } from 'react';
import { Row, Col, Icon, Button, Badge, Tooltip } from 'antd';
import Img from 'react-image';

import Property from '../partials/Builder/Card/Property';

import { generateCardImageLink, generateCardCode } from 'Utils/cardshorthands';
import { addDeckCard, removeDeckCard } from 'Actions/BuilderActions';

class Card extends Component {
	render(){
		const { card, locale, locked, allowDeckControls = false, count = 0, onCardSelect = () => {} } = this.props;
		return(
			<div className={`container-card ${locked ? 'locked' : ''}`}>
				{
				card ?
				<div className="card">
					<a target="_blank" href={
						card.lang === 'JP' ?
						`https://heartofthecards.com/code/cardlist.html?card=WS_${card.cardcode}`
						:
						`https://en.ws-tcg.com/cardlist/list/?cardno=${card.cardcode}`
					}

					>		
						<h2 className="card-name">
							{locale.name || 'NaN'} <Icon type="link" />
							{
								locale.source === "community" &&
								<Tooltip title="Translations for this card are provided by the community, and are subject to change">
									<Icon 
										style={{marginLeft:'4px'}} 
										theme="filled" 
										className="locale-alert clickable" 
										type="question-circle" 
									/>
								</Tooltip>
							}
							{
								locale.source === "akiba" &&
								<Tooltip title="Translations for this card are provided by little akiba, and are subject to change">
									<Icon 
										style={{marginLeft:'4px'}} 
										theme="filled" 
										className="locale-alert clickable akiba" 
										type="question-circle" 
									/>
								</Tooltip>
							}
						</h2>
					</a>
					<div className='cardimage clickable' onClick={() => onCardSelect(card)}>
						<Badge className={`card-quantity ${count < 1 ? 'hidden' : ''}`} count={count} offset={[-5, 10]}
							style={{ backgroundColor: 'black', color: 'white' }}
						>
							<Img
							    src={[
							      generateCardImageLink(card),
							    ]}
						    	unloader={<Icon className="image-not-found" type="question-circle" />}
						  	/>
					  	</Badge>
					</div>
					{
						!!allowDeckControls &&
						<Button.Group className="deck-controls">
							<Button icon="minus" className="danger" size="small" onClick={ () => removeDeckCard(card) }></Button>
							<Button icon="plus" className="success" size="small" onClick={ () => addDeckCard(card) }></Button>
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
				: <span>No card found</span>
				}
			</div>
		)
	}
}

export default Card;