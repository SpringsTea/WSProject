import React, { useState } from 'react';
import { Select } from 'antd';
import { searchCards } from 'Utils/api';

const Option = Select.Option;

export default function ContainsCardSearch({ filters, onSelect }) {

	const [cards, setCards] = useState([]);


	const handleCardSearch = (text) => {

		if(text.length >= 3){
			searchCards({ text, ...filters })
			.then(( res ) => setCards(res))
		}
		else{
			setCards([])
		}
		
	}

	return (
		<Select
			mode="multiple"
			placeholder="Search one or more cards"
			style={{width: '100%'}}
			filterOption={false}
			dropdownMatchSelectWidth={false}
			onSearch={(val) => handleCardSearch(val)}
			onChange={(selectedcards) => onSelect(selectedcards)}
		>
			{
				cards.map((card) => 
					<Option key={card._id} value={card._id}>
						{ `${card.locale.EN.name} (${card.cardcode})` }
					</Option>
				)
			}
		</Select>
	)
}