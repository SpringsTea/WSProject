import React, { Component } from 'react';
import { List, Icon } from 'antd';

import { getLocale } from 'Utils/cardlocale';
import CardItem from '../partials/Builder/CardItem/CardItem';

class CardSelector extends Component {

	shouldComponentUpdate(nextProps){
		//TODO I should not have to do this, why does this component render on card select
		if( nextProps.cards.length === this.props.cards.length && this.props.quantity !== true ){
			return false;
		}

		return true;
	}

	render(){
		const { cards, controls } = this.props;
		return(
			<div className="container-card-selector">
				<List
					dataSource={cards}
					locale={ { emptyText: 'No Cards' } }
					renderItem={ card => <CardItem card={card} controls={controls} locale={getLocale(card)} /> }
				/>
			</div>
		)
	}
}

export default CardSelector;