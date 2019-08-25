import React, { Component } from 'react';
import { Button, Badge, Icon, Avatar } from 'antd';
import Img from 'react-image';

import CardItemIcon from './CardItemIcon';

import { addDeckCard, removeDeckCard, selectCard } from 'Actions/BuilderActions';
import { generateCardImageLink } from 'Utils/cardshorthands'

class CardItem extends Component {

	render(){
		const { card, locale } = this.props;

		return(
			<div
			onMouseEnter={ () => selectCard({card})}
			className="card-item visual-card-item">
				<div className="name">{locale.name}</div>
				<Badge className="card-quantity" count={card.quantity} offset={[-5, 10]} 
					style={{ backgroundColor: 'black', color: 'white' }}>
					<div className='cardimage clickable' onClick={() => selectCard({card}, true)}>
						<Img
					    src={[
					      generateCardImageLink(card),
					    ]}
					    unloader={<Icon className="image-not-found" type="question-circle" />}
					  />
					</div>
				</Badge>
				<div className="controls">
					<Button icon="minus" className="danger" size="small" onClick={ () => removeDeckCard(card) }></Button>
					<Button icon="plus" className="success" size="small" onClick={ () => addDeckCard(card) }></Button>
				</div>
			</div>
		)
	}
}

export default CardItem;