import React, { Component } from 'react';
import { List, Icon } from 'antd';

import CardItem from '../partials/Builder/CardItem/CardItem'

class CardSelector extends Component {

	render(){
		const { handleItemHover } = this;
		const { cards } = this.props;
		return(
			<div className="container-card-selector">
				
				<List
					dataSource={cards}
					renderItem={ card => (
						<CardItem card={card} />
					)}
				/>
			</div>
		)
	}
}

export default CardSelector;