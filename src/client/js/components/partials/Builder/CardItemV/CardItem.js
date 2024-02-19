import React, { Component } from 'react';
import { Button, Badge, Avatar } from 'antd';
import { 
  QuestionCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';

import Img from 'react-image';

const ButtonGroup = Button.Group;

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
				<Badge className="card-quantity" count={card.quantity} offset={[-5, 10]}>
					<div className={`cardimage clickable ${card.cardtype}`} onClick={() => selectCard({card}, true)}>
						<Img
					    src={[
					      generateCardImageLink(card),
					    ]}
					    unloader={<QuestionCircleOutlined className="image-not-found" />}
					  />
					</div>
				</Badge>
				<div className="controls">
					<ButtonGroup>
						<Button icon={<MinusOutlined />} className="danger" size="small" onClick={ () => removeDeckCard(card) }></Button>
						<Button icon={<PlusOutlined />} className="success" size="small" onClick={ () => addDeckCard(card) }></Button>
					</ButtonGroup>
				</div>
			</div>
		)
	}
}

export default CardItem;