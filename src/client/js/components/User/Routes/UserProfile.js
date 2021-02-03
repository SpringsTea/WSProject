import { Component } from 'react';
import { Card } from 'antd';

export default function UserProfile ({username}){

	return(
		<div className="container-userprofile">
			<Card 
				title={<span>{username} - <span>user since - - - -</span></span>} 
				size="small"
			>
			    
			</Card>
		</div>
	)
}