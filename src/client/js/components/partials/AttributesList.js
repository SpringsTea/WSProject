import React, { Component } from 'react';
import { Icon } from 'antd';

import { attributeIcons } from 'Constants/attributes';

class AttributesList extends Component {

	render(){
		const { attributes } = this.props;
		return(
			<div className="container-attributes">
				{
					attributes.map( (attr, i) => <Icon title={attr.name} key={i}
						type={attributeIcons[attr.name].icon} className={attributeIcons[attr.name].class} />
					)
				}
			</div>
		)
	}
}

export default AttributesList;