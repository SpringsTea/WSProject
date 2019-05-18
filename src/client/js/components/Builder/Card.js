import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import Img from 'react-image';

import Property from '../partials/Builder/Card/Property';

import { generateCardImageLink, generateCardCode } from 'Utils/cardshorthands';

class Card extends Component {
	render(){
		const { card, locale, locked, onCardSelect = () => {} } = this.props;
		return(
			<div className={`container-card ${locked ? 'locked' : ''}`}>
				{
				card ?
				<div className="card">
					<a target="_blank" href={
						card.lang === 'JP' ?
						`https://heartofthecards.com/code/cardlist.html?card=WS_${card.set}/${card.side}${card.release}-${card.sid}`
						:
						`https://en.ws-tcg.com/cardlist/list/?cardno=${card.set}/${card.side}${card.release}-${card.sid}`
					}

					>		
						<h2 className="card-name">{locale.name || 'NaN'} <Icon type="link" /></h2>
					</a>
					<div className='cardimage clickable' onClick={() => onCardSelect(card)}>
						<Img
					    src={[
					      generateCardImageLink(card),
					    ]}
					    unloader={<Icon className="image-not-found" type="question-circle" />}
					  />
					</div>
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