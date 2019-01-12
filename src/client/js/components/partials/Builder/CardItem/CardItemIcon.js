import React, { Component } from 'react';
import { Avatar } from 'antd';

import { calculateShortHand } from 'Utils/cardshorthands';

class CardItemIcon extends Component {

	render(){
		const { card } = this.props;
		return(
			<Avatar shape='square' className={`ws-${card.color}`} style={{ verticalAlign: 'middle' }} size="large">
	          { calculateShortHand(card) }
	        </Avatar>
		)
	}
}

export default CardItemIcon;