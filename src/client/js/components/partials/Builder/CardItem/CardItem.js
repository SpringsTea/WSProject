import React, { Component } from 'react';
import { List, Button, Avatar } from 'antd';
import { 
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';

import CardItemIcon from './CardItemIcon';

import { addDeckCard, removeDeckCard, selectCard } from 'Actions/BuilderActions';

class CardItem extends Component {

	render(){
		const { card, locale, controls = true } = this.props;

		return(
			<List.Item 
			onMouseEnter={ () => selectCard({card})}
			className="card-item">
				<List.Item.Meta 
					className="clickable"
					onClick={ () => selectCard({card}, true) }
					avatar={<CardItemIcon card={card} />}
					title={`${locale.name} ${card.quantity ? `(${card.quantity})` : ''}`}
				/>
				{
					controls &&
					<Button.Group>
						<Button icon={<MinusOutlined />} className="danger" size="small" onClick={ () => removeDeckCard(card) }></Button>
						<Button icon={<PlusOutlined />} className="success" size="small" onClick={ () => addDeckCard(card) }></Button>
					</Button.Group>
				}
			</List.Item>
		)
	}
}

export default CardItem;