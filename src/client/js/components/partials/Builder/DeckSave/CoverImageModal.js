import React, { useState } from 'react';
import { Row, Col, Modal } from 'antd';
import DeckImage from './DeckImage';

import { receiveDeck } from 'Actions/BuilderActions';

export default function CoverImageModal({deck, deckdata, visible, handleVisible}) {

	return (
		<Modal
	  		title="Choose a cover image"
	  		visible={visible}
	  		styles={
	  			{ body: {maxHeight: '600px', overflowY:'auto'}
	  		}}
	  		onCancel={handleVisible}
	  		width="600px"
	  		footer={null}

	  	>
			<div className="container-coverimage-modal">
				<Row gutter={4}>
					{
						deck.reduce((accumulator, current) => {//Remove duplicates
						  if (! accumulator.find(({_id}) => _id === current._id)) {
						    accumulator.push(current);
						  }
						  return accumulator;
						}, [])
						.sort( (a,b) => a.sid.localeCompare(b.sid) )
						.map((card, i) => 
							<Col span={8} key={i} className="clickable" style={{marginBottom: '4px'}}
								onClick={() => { //Swap the clicked card with the first deck.cards index
									let deckcards = deck;
									let coverindex = deckcards.findIndex((c) => c._id === card._id)
									let newcover = deckcards[coverindex]
									deckcards[coverindex] = deckcards[0];
									deckcards[0] = newcover;
									handleVisible()
									receiveDeck({...deckdata, cards:deckcards});
								}}
							>
								<DeckImage card={card}/>
							</Col>
						)
					}
				</Row>
			</div>
		</Modal>
	)
}