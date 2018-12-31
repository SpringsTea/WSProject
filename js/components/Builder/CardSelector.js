import React, { Component } from 'react';
import { List } from 'antd';

class CardSelector extends Component {
	render(){
		const { cards } = this.props;
		return(
			<div className="container-card-selector">
				<List
					itemLayout="horizontal"
					dataSource={cards}
					renderItem={ card => (
						<List.Item>
							<List.Item.Meta 
								avatar={/*TODO create an icon that can represent color and card type*/}
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