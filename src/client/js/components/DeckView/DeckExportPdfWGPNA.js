import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { DecklistWarning } from 'Constants/copy/FormDownload'

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
	          <DecklistWarning />

	          <p style={{color: 'red'}}>
	          	Due to technical limitations, Japanese text will not appear anywhere in pdf exports.
	          	Card names can be entered into the form after export using Adobe Acrobat Reader.
	          	We apologize for the inconvenience.
	          </p>
	        </Modal>
		]
	)
}