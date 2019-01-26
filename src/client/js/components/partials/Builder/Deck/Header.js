import React, { Component } from 'react';
import { Card } from 'antd';

class Header extends Component {

	render(){
		const { cards } = this.props;
		return(
			<Card className="deck-header">
				{cards.length}
			</Card>
		)
	}
}

export default Header;