import React, { useState } from 'react';
import Img from 'react-image';
import { 
  QuestionCircleOutlined
} from '@ant-design/icons';

export default function DeckTriggers({ triggers = [], imageStyle = {}, limit = 9 }) {

	return (
		<span>
			{
				triggers.slice(0, limit).map((trigger, i) => 
					<span key={i} style={{display: 'inline-block'}} className="trigger-icon">
						<Img
							style={{
								width: '32px',
								...imageStyle
							}}
						    src={`/images/assets/triggers/${trigger}.png`}
					    	unloader={<QuestionCircleOutlined className="image-not-found" />}
					    />
					</span>
				)
			}
			<span style={{position: 'relative', bottom: '10px'}}>
				<strong>
					{
						triggers.length > limit ? `+${triggers.length - limit}` : ''
					}
				</strong>
			</span>
		</span>
	)
}