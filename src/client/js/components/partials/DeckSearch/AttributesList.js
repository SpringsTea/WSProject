import React, { Component } from 'react';
import { Icon } from 'antd';

import { attributeIcons } from 'Constants/attributes';

class AttributesList extends Component {

	render(){
		const { attributes } = this.props;
		return(
			<div className="container-attributes">
				{
					attributes.map( (attr = {}, i) => {

						let idata = attributeIcons[attr.name] || {};

						return <Icon title={attr.name} key={i}
						type={idata.icon} className={idata.class} />
					})
				}
			</div>
		)
	}
}

export default AttributesList;