import React, { useState, useCallback } from 'react';
import { Select, Popover } from 'antd';
import { throttle } from 'throttle-debounce';

import { searchCards } from 'Utils/api';

const Option = Select.Option;

export default function ContainsCardSearch({ filters = {}, onSelect }) {

	const [cards, setCards] = useState([]);

	const handleCardSearch = (text) => {
		if(text.length >= 3){
			searchCards({ text, ...filters })
			.then(( res ) => setCards(res))
			.catch((err) => setCards([]))
		}
		else{
			setCards([])
		}
		
	}

	//https://dmitripavlutin.com/react-throttle-debounce/
	const debouncedCardSearch = useCallback(
    	throttle(1000, handleCardSearch)
  , []);

	return (
		<div id="cardcontainsselect">
			<Select
				mode="multiple"
				placeholder="Search one or more cards"
				style={{width: '100%'}}
				filterOption={false}
				dropdownMatchSelectWidth={false}
				onSearch={debouncedCardSearch}
				onChange={(selectedcards) => onSelect(selectedcards)}
				getPopupContainer={node => node.parentElement}
			>
				{
					cards.map((card) => 	
						<Option key={card._id} value={card._id}>
							<Popover 
								//title="FUCK" 
								content={ <img src={`/images/${card.imagepath}`} /> }
								trigger="hover"
								placement="left"
								//https://github.com/ant-design/ant-design/issues/9550#issuecomment-371720616
								getPopupContainer={node => document.getElementById("cardcontainsselect")}
								overlayStyle={{ zIndex: 1200 }}
							>
								{ `${card.locale.EN.name} (${card.cardcode})` }
							</Popover>
						</Option>
						
					)
				}
			</Select>
		</div>
	)
}