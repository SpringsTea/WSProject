import React, { Component } from 'react';
import { Input, Row, Col } from 'antd'

import Card from './Card';
import SeriesSelect from './SeriesSelect';
import CardSelector from './CardSelector';

import Deck from './Deck';

import BuilderStore from '../../stores/BuilderStore';

const buildState = () => ({
  serieses: BuilderStore.getSeriesesData(),
  buildercards: BuilderStore.getBuilderCards(),
  deck: BuilderStore.getDeckCards(),
});

class Builder extends Component {

  state = {
  	selectedCard: {
  		card: null,
  		location: null,
  	},
  	...buildState()
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    BuilderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BuilderStore.removeChangeListener(this.onChange);
  }

  handleViewCard = (card) =>{
  	this.setState({
  		selectedCard:{
  			card:card,
  			location:null,
  		}
  	})
  }

	render(){
		const { handleViewCard } = this;
		const { selectedCard, serieses, buildercards, deck } = this.state;
		return(
			<div className="container-builder">
				<Row>
					<Col span={6}>
						<SeriesSelect serieses={serieses} />
						<CardSelector ViewCard={handleViewCard} cards={buildercards} />
						<Card data={selectedCard.card} />
					</Col>
					<Col span={18}>
						<Deck ViewCard={handleViewCard} cards={deck} />
					</Col>
				</Row>
			</div>
		)
	}
}

export default Builder;