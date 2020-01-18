import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { DecklistWarning } from 'Constants/copy/FormDownload'

export default function Export({ deck }) {

	const [modal, setModal] = useState(false);

	return (
		[
			<div onClick={() => setModal(true)} key="1">
				PDF ( North America Tournament Form  )
			</div>,
			<Modal
			  key="2"
	          title="Download North America Tournament Form"
	          visible={modal}
	          okText='Accept'
	          onOk={ () => {
	          	var win = window.open(`/api/deck/${deck.deckid}/form/BSNA`, '_blank');
  				win.focus();
	          	setModal(false)
	          }}
	          onCancel={() => setModal(false)}
	        >
	          <DecklistWarning />
	        </Modal>
		]
	)
}