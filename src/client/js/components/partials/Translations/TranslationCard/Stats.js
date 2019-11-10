import React from 'react';
import { Icon, Input, Row, Col } from 'antd';

import { generateCardCode } from 'Utils/cardshorthands';

export default function Stats({card = {}, locale = {}}) {
	let cardcode = generateCardCode(card)
	return (
		<div className="stats">
			<div className="grid">
				<Row>
					<Col className="title" span={4}>
						Card Code
					</Col>	
					<Col className="content" span={20}>
						{cardcode} 
						&nbsp;
						<a target="_blank" href={`https://ws-tcg.com/cardlist/?cardno=${cardcode}`}>
				 			(W)
						</a>
						&nbsp;
						<a target="_blank" href={`https://heartofthecards.com/code/cardlist.html?card=WS_${cardcode}`}>
				 			(H)
						</a>

					</Col>
				</Row>
				<Row>
					<Col className="title" span={4}>
						Side
					</Col>	
					<Col className="content" span={8}>
						{card.side}
					</Col>
					<Col className="title" span={4}>
						Rarity
					</Col>	
					<Col className="content" span={8}>
						{card.rarity}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={4}>
						Colour
					</Col>	
					<Col className="content" span={8}>
						{card.colour}
					</Col>
					<Col className="title" span={4}>
						Type
					</Col>	
					<Col className="content" span={8}>
						{card.cardtype}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={4}>
						Level
					</Col>	
					<Col className="content" span={8}>
						{card.level}
					</Col>
					<Col className="title" span={4}>
						Power
					</Col>	
					<Col className="content" span={8}>
						{card.power}
					</Col>
				</Row>
				<Row>
					<Col className="title" span={4}>
						Soul
					</Col>	
					<Col className="content" span={8}>
						{card.soul}
					</Col>
					<Col className="title" span={4}>
						Triggers
					</Col>	
					<Col className="content" span={8}>
						{
							card.trigger.join()
						}
					</Col>
				</Row>
			</div>
		</div>
	)
}