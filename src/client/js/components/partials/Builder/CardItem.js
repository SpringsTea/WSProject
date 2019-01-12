import React, { Component } from 'react';
import { List, Button, Icon } from 'antd';

import { addDeckCard, removeDeckCard } from '../../../actions/BuilderActions';

class CardItem extends Component {

	render(){
		const { handleItemHover, card } = this.props;
		return(
			<List.Item 
			onMouseEnter={ () => handleItemHover(card)}
			className="card-item">
				<List.Item.Meta 
					/*TODO create an icon that can represent color and card type*/
					title={`${card.name} ${card.quantity ? `(${card.quantity})` : ''}`}
				/>
				<Button.Group>
					<Button icon="minus" className="danger" onClick={ () => removeDeckCard(card) }></Button>
					<Button icon="plus" className="success" onClick={ () => addDeckCard(card) }></Button>
				</Button.Group>
			</List.Item>
		)
	}
}

export default CardItem;