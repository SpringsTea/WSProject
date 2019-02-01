import React, { Component } from 'react';
import { Input, Row, Col } from 'antd'

import Card from './Card';
import SeriesSelect from './SeriesSelect';
import CardSelector from './CardSelector';
import Filters from '../partials/Builder/CardSelector/Filters'

import Deck from './Deck';

import BuilderStore from '../../stores/BuilderStore';

const buildState = () => ({
  serieses: BuilderStore.getSeriesesData(),
  buildercards: BuilderStore.getBuilderCards(),
  selectedCard: BuilderStore.getSelectedCard(),
  deck: BuilderStore.getDeckCards(),
  builderfilters: BuilderStore.getBuilderFilters(),
});

class Builder extends Component {

  state = {
  	...buildState()
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    BuilderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BuilderStore.removeChangeListener(this.onChange);
  }

	render(){
		const { selectedCard, serieses, buildercards, deck } = this.state;
		return(
			<div className="container-builder">
				<Row gutter={16}>
					<Col xxl={8} xl={8} lg={12} md={24}
          className='container-series-selector'>
						<SeriesSelect serieses={serieses} />
            <Filters />
						<CardSelector cards={buildercards} />
						<Card data={selectedCard.card} />
					</Col>
					<Col xxl={16} xl={16} lg={12} md={24}> 
						<Deck cards={deck} />
					</Col>
				</Row>
			</div>
		)
	}
}

export default Builder;