import React, { Component } from 'react';

import {
  TrophyOutlined,
  HeartOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import { attributeIcons } from 'Constants/attributes';

class AttributesList extends Component {

	render(){
		const { attributes } = this.props;
		return(
			<span className="container-attributes">
				{
					attributes.map( (attr = {}, i) => {

						let idata = attributeIcons[attr.name] || {};

						if(idata.icon === 'trophy'){
							return <TrophyOutlined title={attr.name} key={i} className={idata.class}/>
						}
						if(  idata.icon === 'heart' ){
							return <HeartOutlined title={attr.name} key={i} className={idata.class}/>
						}					
					})
				}
			</span>
		)
	}
}

export default AttributesList;