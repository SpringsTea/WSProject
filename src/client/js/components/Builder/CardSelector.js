import React, { Component } from 'react';
import { List, Icon } from 'antd';

import CardItem from '../partials/Builder/CardItem'

class CardSelector extends Component {

	handleItemHover = (card) =>{
		const { ViewCard } = this.props;
		ViewCard(card);
	}

	render(){
		const { handleItemHover } = this;
		const { cards } = this.props;
		return(
			<div className="container-card-selector">
				<List
					itemLayout="horizontal"
					dataSource={cards}
					renderItem={ card => (
						<CardItem card={card} handleItemHover={handleItemHover} />
					)}
				/>
			</div>
		)
	}
}

export default CardSelector;