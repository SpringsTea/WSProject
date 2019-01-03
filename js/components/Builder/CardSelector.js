import React, { Component } from 'react';
import { List } from 'antd';

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
						<List.Item>
							<List.Item.Meta 
								/*TODO create an icon that can represent color and card type*/
								onMouseOver={ () => handleItemHover(card)}
								title={card.name}
							/>
						</List.Item>
					)}
				/>
			</div>
		)
	}
}

export default CardSelector;