import React, { Component } from 'react';
import { Icon, Badge } from 'antd';
import Img from 'react-image';

import { selectCard } from 'Actions/DeckActions';

class CardItem extends Component {

	render(){
		const { card } = this.props;
		return(
			<div className="container-carditem">
				<Badge count={card.quantity} style={{ backgroundColor: '#000000' }}>
				<div className='cardimage' onMouseEnter={ () => selectCard({card})}>
					<Img
				    src={[
				      `/images/${card.set}/${card.side}${card.release}/${card.sid}.gif`,
				    ]}
				    unloader={<Icon className="image-not-found" type="question-circle" />}
				  />
				</div>
				</Badge>
				<div className="card-name">
					{card.name}
				</div>
			</div>
		)
	}
}

export default CardItem;