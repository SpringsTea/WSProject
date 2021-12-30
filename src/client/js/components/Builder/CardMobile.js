import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import Card from './Card';

export default function CardMobile({ card, locked, count, onClose, ...args }) {
	return (
		<Modal
	  		title=""
	  		visible={!!locked}
	  		footer={[
	  			<Button onClick={() => onClose(card)} type="primary" style={{width:'100%'}}>
	  				Close
	  			</Button>
	  		]}
	  		onCancel={() => onClose(card)}
	  	>
			<div className="container-cardmobile" style={{marginTop: '20px'}}>
				<Card card={card} locked={false} count={count} {...args} />
			</div>
		</Modal>
	)
}