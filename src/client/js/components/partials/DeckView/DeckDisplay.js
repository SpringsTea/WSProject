import React, { Component } from 'react';
import { Row, Col, ConfigProvider } from 'antd';

import { filterCardQuantity } from 'Utils/cardfilter';

import CardItem from './CardItem';

class DeckDisplay extends Component {

	render(){
		const { deck } = this.props;
		const xxl = 4;
		const xl = 6;
		const lg = 12;
		const md = 8;
		const sm = 12;
		const xs = 24;

		let cards = filterCardQuantity(deck.cards)

		return(
			<ConfigProvider
				theme={{
					//Custom large breakpoints to facilitate cards fitting better
					token: {
					 
					 screenXL: 1600,         // Minimum for XL: 1600px (large desktops)
					 screenXXL: 1920,        // Minimum for XXL: 1920px (large widescreen monitors)

					 screenXLMin: 1600,      // Minimum value for XL: 1200px to 1599px
					 screenXXLMin: 1920,     // Minimum value for XXL: 1600px and beyond

					 screenXLMax: 1919,      // Maximum value for XL: up to 1599px
					}
				}}
			>
			<div className="container-deckdisplay">
				<div className="header">Level 0</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 0 && card.cardtype !== 'CX' ).sort((a,b) => a.sid.localeCompare(b.sid))
						.map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={xs} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 1 </div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 1 ).sort((a,b) => a.sid.localeCompare(b.sid))
						.map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={xs} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 2</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 2 ).sort((a,b) => a.sid.localeCompare(b.sid))
						.map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={xs} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Level 3</div>
				<Row gutter={8}>
					{
						cards.filter( (card) => card.level === 3 ).sort((a,b) => a.sid.localeCompare(b.sid))
						.map( (card, i) => 
						<Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={xs} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
				<div className="header">Climaxes</div>
				<Row gutter={8}>
					{
						//CXs use different breakpoint scaling due to being horizontal
						cards.filter( (card) => card.cardtype === 'CX' ).sort((a,b) => a.sid.localeCompare(b.sid))
						.map( (card, i) => 
						<Col xxl={xl} xl={xl} lg={lg} md={xs} sm={xs} xs={xs} key={i}>
							<CardItem card={card} />
						</Col> 
						)
					}
				</Row>
			</div>
			</ConfigProvider>
		)
	}
}

export default DeckDisplay;