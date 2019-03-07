import React, { Component } from 'react';
import { Icon, Badge } from 'antd';
import Img from 'react-image';

import { generateCardImageLink } from 'Utils/cardshorthands';
import { selectCard } from 'Actions/DeckActions';

class CardItem extends Component {

	render(){
		const { card } = this.props;
		return(
			<div className="container-carditem clickable">
				<Badge count={card.quantity} style={{ backgroundColor: '#000000' }}>
				<div className='cardimage' onMouseEnter={ () => selectCard({card})} onClick={ () => selectCard({card}, true) }>
					<Img
				    src={[
				      generateCardImageLink(card),
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