import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import Img from 'react-image';

import Property from '../partials/Builder/Card/Property';

class Card extends Component {
	render(){
		const { data } = this.props;
		return(
			<div className="container-card">
				{
				data ?
				<div className="card">		
					<h2>{data.name || 'NaN'}</h2>
					<div className='cardimage'>
						<Img
					    src={[
					      `/images/${data.set}/${data.side}${data.release}/${data.sid}.gif`,
					    ]}
					    unloader={<Icon className="image-not-found" type="question-circle" />}
					  />
					</div>
					<div className="cardtext">
						{ data.ability.map( (ability) => <div key={ability}>{ability}</div> ) }
					</div>
					<div className="extra"> 
						<Row type='flex'>
							<Property name='Type' value={data.type} />
							<Property name='Level' value={data.level} />
							<Property name='Cost' value={data.cost} />						
							<Property name='Color' value={data.color} />
							<Property name='Power' value={data.power} />
							<Property name='Soul' value={data.soul} />
							<Property name='Card No' value={`${data.set}/${data.side}${data.release}-${data.sid}`} />
							{
								data.attributes.map( attribute =>  <Property key={attribute} name='Trait' value={attribute} />)
							}
						</Row>
					</div>
					<div>
						<a target="_blank" href={`https://heartofthecards.com/code/cardlist.html?card=WS_${data.set}/${data.side}${data.release}-${data.sid}`}>Link</a>
					</div>
				</div>
				: <span>No card found</span>
				}
			</div>
		)
	}
}

export default Card;