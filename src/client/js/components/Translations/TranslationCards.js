import React, { Component } from 'react';
import { Row, Col } from 'antd';

import TranslationCard from './TranslationCard';

class TranslationCards extends Component {

	render(){
		const { cards } = this.props;
		return(
			<div className="container-translationcards">
				<Row gutter={16}>
					{ cards.map( (card, i) => 
						<Col span={12} key={i}>
							<TranslationCard card={card} />
						</Col>
					) }
				</Row>
			</div>
		)
	}
}

export default TranslationCards;