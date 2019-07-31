import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { getLocale } from 'Utils/cardlocale';
import CardItem from 'Partials/Builder/CardItemV/CardItem';

const colspans = {
	portrait: {
		xxl: 3,
		xl: 4,
		lg: 8,
		md: 4,
		sm: 8,
		xs: 12
	},
	landscape:{
		xxl: 4,
		xl: 6,
		lg: 12,
		md: 8,
		sm: 12,
		xs: 12
	}
}

class CardSelector extends Component {

	shouldComponentUpdate(nextProps){
		//TODO I should not have to do this, why does this component render on card select
		if( nextProps.cards.length === this.props.cards.length && this.props.quantity !== true ){
			return false;
		}

		return true;
	}

	render(){
		const { cards } = this.props;
		return(
			<div className="container-card-selector">
				<Row>
					{
						cards.map((card, i) => {

							let s = card.cardtype === 'CX' ? colspans.landscape : colspans.portrait;

							return <Col key={i} xxl={s.xxl} xl={s.xl} lg={s.lg} md={s.md} sm={s.sm} xs={s.xs} gutter={8}>
								<CardItem card={card} locale={getLocale(card)} />
							</Col>
						})
					}
				</Row>
			</div>
		)
	}
}

export default CardSelector;