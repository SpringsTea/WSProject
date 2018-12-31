import React, { Component } from 'react';
import { Input, Row, Col } from 'antd'

import Card from './Card';
import SeriesSelect from './SeriesSelect';

import BuilderStore from '../../stores/BuilderStore';

const buildState = () => ({
  selectedCard: BuilderStore.getTestData(),
  serieses: BuilderStore.getSeriesesData(),
  buildercards: BuilderStore.getBuilderCards(),
});

class Builder extends Component {

  state = buildState();

  onChange = () => this.setState(buildState);

  componentDidMount() {
    BuilderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BuilderStore.removeChangeListener(this.onChange);
  }

	render(){
		const { selectedCard, serieses } = this.state;
		return(
			<div className="container-builder">
				<Row>
					<Col span={6}>
						{/*<Card data={selectedCard} />*/}
						<SeriesSelect serieses={serieses} />
					</Col>
					<Col span={18}>
						
					</Col>
				</Row>
			</div>
		)
	}
}

export default Builder;