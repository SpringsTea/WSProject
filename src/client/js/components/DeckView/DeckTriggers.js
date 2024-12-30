import React, { useState } from 'react';
import Img from 'react-image';
import { 
  QuestionCircleOutlined
} from '@ant-design/icons';

export default function DeckTriggers({ triggers = [], imageStyle = {} }) {

	return (
		<span>
			{
				triggers.map((trigger) => 
					<div className="trigger-icon">
						<Img
							style={{
								width: '32px',
								...imageStyle
							}}
						    src={`/images/triggers/${trigger}.png`}
					    	unloader={<QuestionCircleOutlined className="image-not-found" />}
					    />
					</div>
				)
			}
		</span>
	)
}