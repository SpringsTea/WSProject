import React from 'react';
import { Button } from 'antd';

import { Abilities, States, Triggers } from 'Constants/Keywords'


export default function Keywords({handleKeywordClick, attributes}) {
	return (
		<div className="container-keywords">
			<div>
				<Button.Group size="small">
					{
						Abilities.map( (e, i) => 
							<Button onClick={() => handleKeywordClick(e.text)} key={i} value={e.text}>{e.label}</Button>
						)
					}	
				</Button.Group>	
			</div>
			<div>
				<Button.Group size="small">
					{
						States.map( (e, i) => 
							<Button onClick={() => handleKeywordClick(e.text)} key={i} value={e.text}>{e.label}</Button>
						)
					}	
				</Button.Group>	
			</div>
			<div>
				<Button.Group size="small">
					{
						Triggers.map( (e, i) => 
							<Button onClick={() => handleKeywordClick(e.text)} key={i} value={e.text}>{e.label}</Button>
						)
					}	
				</Button.Group>	
			</div>	
			<br/>
			<div>
				<Button.Group size="small">
					{
						Object.values(attributes).sort().map( (e, i) => 
							<Button onClick={() => handleKeywordClick(`《${e}》`)} key={i} value={e}>{e}</Button>
						)
					}	
				</Button.Group>	
			</div>
		</div>
	)
}