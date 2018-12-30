import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Property from './partials/Card/Property';

class Card extends Component {
	render(){
		const { data } = this.props;
		return(
			<div className="container-card">
				<div className="card">
					<div>{data.name}</div>
					<img src={data.image} />
					<div className="cardtext">{data.cardText}</div>
					<div className="extra"> 
						<Row type='flex'>
							<Property name='Type' value={data.type} />
							<Property name='Level' value={data.level} />
							<Property name='Cost' value={data.cost} />						
							<Property name='Color' value={data.color} />
							<Property name='Power' value={data.power} />
							<Property name='Soul' value={data.soul} />
							<Property name='Card No' value={data.cardID} />
							<Property name='Trait' value={data.trait1} />
							<Property name='Trait' value={data.trait2} />
						</Row>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;