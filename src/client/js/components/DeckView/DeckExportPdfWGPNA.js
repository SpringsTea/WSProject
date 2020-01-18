import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export default function Export({ deck }) {

	const [modal, setModal] = useState(false);

	return (
		[
			<div onClick={() => setModal(true)} key="1">
				PDF ( WGP NA Form  )
			</div>,
			<Modal
			  key="2"
	          title="Download English WGP Form"
	          visible={modal}
	          okText='Accept'
	          onOk={ () => {
	          	var win = window.open(`/api/deck/${deck.deckid}/form/WGPNA`, '_blank');
  				win.focus();
	          	setModal(false)
	          }}
	          onCancel={() => setModal(false)}
	        >
	          <p>
		          EncoreDecks.com does not guarantee the accuracy of card data provided, including the <strong>card name and code</strong>, 
		          and is not liable for any repercussions that are due to an incorrect registration sheet.
	          </p>
	          <p><strong>Double check your deck list!</strong></p>
	        </Modal>
		]
	)
}