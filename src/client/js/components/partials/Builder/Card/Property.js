import React, { Component } from 'react';
import { Col } from 'antd';

class Property extends Component {
	render(){
		const { name, value } = this.props; 
		return(
			value ?
			<Col span={8}>
				<div className="container-property">
					<span>{name}</span> : <span>{value}</span>
				</div>
			</Col> 
			: null
		)
	}
}

export default Property;