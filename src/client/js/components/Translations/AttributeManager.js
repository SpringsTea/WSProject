import React, { useState } from 'react';
import { Input, List, Form, Modal } from 'antd';

const ManagerItem = ({key, value, handleEdit}) =>
<List.Item key={key}>
	<List.Item.Meta 
		title={key}
	/>
	<Input defaultValue={value} style={{width: '300px'}} onChange={ (e) => handleEdit(key, e.target.value) } />
</List.Item>

export default function AttributeManager({ attributes, manageropen, saving, handleSaveAttributes, handleCancel }) {

	const [state, setState] = useState(attributes);

	return (
		<Modal
	  		title="Trait Manager"
	  		visible={manageropen}
	  		bodyStyle={{maxHeight: '600px', overflowY:'auto'}}
	  		onCancel={handleCancel}
	  		onOk={() => handleSaveAttributes(state)}
	  		okText="Save"
	  		confirmLoading={saving}
	  		width="800px"
	  	>
			<div className="container-attributemanager">
				<List
					bordered
					dataSource={Object.keys(attributes)}
					renderItem={ (item) => 
						ManagerItem({ key: item, value: attributes[item], 
						handleEdit: (key, value) => setState({
							...state,
							[key]: value
						}) 
					})}
				/>
			</div>
		</Modal>
	)
}