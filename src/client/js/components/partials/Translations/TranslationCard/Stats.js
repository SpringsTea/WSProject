import React from 'react';
import { Icon, Input, Row, Col } from 'antd';
import Img from 'react-image';

import { generateCardImageLink, generateCardCode } from 'Utils/cardshorthands';

export default function Stats({card = {}, locale = {}}) {
	return (
		<div className="stats">
			<div className="container-cardimage">
				<Img
				src={[
				  generateCardImageLink(card),
				]}
					unloader={<Icon className="image-not-found" type="question-circle" />}
				/>
			</div>
			<div className="grid">
				<Row>
					<Col className="title" span={6}>
						Card Code
					</Col>	
					<Col className="content" span={18}>
						{generateCardCode(card)}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={6}>
						Side
					</Col>	
					<Col className="content" span={6}>
						{card.side}
					</Col>
					<Col className="title" span={6}>
						Rarity
					</Col>	
					<Col className="content" span={6}>
						{card.rarity}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={6}>
						Colour
					</Col>	
					<Col className="content" span={6}>
						{card.colour}
					</Col>
					<Col className="title" span={6}>
						Type
					</Col>	
					<Col className="content" span={6}>
						{card.cardtype}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={6}>
						Level
					</Col>	
					<Col className="content" span={6}>
						{card.level}
					</Col>
					<Col className="title" span={6}>
						Power
					</Col>	
					<Col className="content" span={6}>
						{card.power}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={6}>
						Soul
					</Col>	
					<Col className="content" span={6}>
						{card.soul}
					</Col>
					<Col className="title" span={6}>
						Triggers
					</Col>	
					<Col className="content" span={6}>
						{
							card.trigger.join()
						}
					</Col>
				</Row>
			</div>
		</div>
	)
}