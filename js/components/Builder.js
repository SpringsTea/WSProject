import React, { Component } from 'react';
import { Input, Row, Col } from 'antd'

import Card from './Card';

import BuilderStore from '../stores/BuilderStore'

const buildState = () => ({
  selectedCard: BuilderStore.getTestData(),
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
		const { selectedCard } = this.state;
		return(
			<div className="container-builder">
				<Row>
					<Col span={6}>
						<Card data={selectedCard} />
					</Col>
					<Col span={18}>

					</Col>
				</Row>
			</div>
		)
	}
}

export default Builder;