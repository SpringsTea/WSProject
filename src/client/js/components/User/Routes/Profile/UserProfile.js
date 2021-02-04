import { Component } from 'react';
import { Card, Typography, Row, Col } from 'antd';

import DeckBarChart from './DeckBarChart';
import DeckCard from 'Partials/DeckSearch/DeckCard';

const { Text } = Typography;

export default function UserProfile ({user}){
	const regdate = new Date(user.regdate);
	return(
		<div className="container-userprofile">
			<Card 
				title={<span>{user.username} - 
					<Text type="secondary"> User Since { `${regdate.getFullYear()}-${regdate.getMonth() + 1}-${regdate.getDate()}` }</Text>
				</span>} 
				size="small"
			>
				<Card 
				title={
					<span>Deck Stats -
						<Text type="secondary"> { user.decks.length } Total Decks </Text>
					</span>
				}
				size='small'
				>	
					<Row>
						<Col lg={4}>
							<div style={{fontWeight:'bold', width:'100%', textAlign: 'center'}}>*Newest Deck*</div>
							<DeckCard deck={user.coverdeck} loggedin={true} />
						</Col>
						<Col lg={6}>
							<DeckBarChart decks={user.decks} />
						</Col>
					</Row>
				</Card>		
				<Card>
					SOCIAL
				</Card>	  
			</Card>
		</div>
	)
}