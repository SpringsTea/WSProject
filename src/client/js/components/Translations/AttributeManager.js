import React from 'react';
import { Input, List, Form } from 'antd';
import { editAttribute } from 'Actions/TranslationActions';

const ManagerItem = ({key, value}) =>
<List.Item key={key}>
	<List.Item.Meta 
		title={key}
	/>
	<Input defaultValue={value} style={{width: '300px'}} onChange={ (e) => editAttribute(key, e.target.value) } />
</List.Item>

export default function AttributeManager({ attributes }) {

	return (
		<div className="container-attributemanager">
			<List
				bordered
				dataSource={Object.keys(attributes)}
				renderItem={ (item) => ManagerItem({ key: item, value: attributes[item] }) }
			/>
		</div>
	)
}