import React from 'react';
import { Button } from 'antd';

import { Abilities, States } from 'Constants/Keywords'


export default function Keywords() {
	return (
		<div className="container-keywords">
			<div>
				<Button.Group size="small">
					{
						Abilities.map( (e, i) => 
							<Button key={i} value={e.text}>{e.label}</Button>
						)
					}	
				</Button.Group>	
			</div>
			<div>
				<Button.Group size="small">
					{
						States.map( (e, i) => 
							<Button key={i} value={e.text}>{e.label}</Button>
						)
					}	
				</Button.Group>	
			</div>	
		</div>
	)
}