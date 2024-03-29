import { Component } from 'react';
import { Card, Typography, Row, Col } from 'antd';

import DeckBarChart from './DeckBarChart';
import Bio from './Bio';
import SocialMedia from './SocialMedia/index.js';
import DeckCard from 'Partials/DeckSearch/DeckCard';

import { receiveUser } from 'Actions/UserActions';

const { Text } = Typography;

export default function UserProfile ({user}){
	const regdate = new Date(user.regdate);

	const updateUserConfig = (data) => {
		receiveUser({
			...user,
			config: data
		})
	}

	return(
		<div className="container-userprofile">
			<Card
			size="small"
			>
				<Bio user={user} onFinish={updateUserConfig} />
			</Card>
			<Card 
				title={<span>{user.username} - 
					<Text type="secondary"> User Since { `${regdate.getFullYear()}-${regdate.getMonth() + 1}-${regdate.getDate()}` }</Text>
				</span>} 
				size="small"
			>
				{ user.decks.length > 0 && 
					<Card 
					title={
						<span>Deck Stats -
							<Text type="secondary"> { user.decks.length } Total Decks </Text>
						</span>
					}
					size='small'
					>	
						<Row>
							{ !!user.coverdeck &&
								<Col lg={6}>
									<div style={{fontWeight:'bold', width:'100%', textAlign: 'center'}}>*Newest Deck*</div>
									<DeckCard deck={user.coverdeck} loggedin={true} />
								</Col>
							}
							<Col lg={12}>
								<DeckBarChart decks={user.decks} />
							</Col>
						</Row>
					</Card>	
				}	
				<Card
				title="Social"
				small='small'
				>
					<SocialMedia user={user} onFinish={updateUserConfig} />
				</Card>	  
			</Card>
		</div>
	)
}