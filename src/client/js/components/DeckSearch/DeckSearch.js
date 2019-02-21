import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'antd'

import DeckSearchStore from '../../stores/DeckSearchStore';

const buildState = () => ({
  decks: DeckSearchStore.getDecks(),
});

class DeckSearch extends Component {

  state = {
  	...buildState(),
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckSearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckSearchStore.removeChangeListener(this.onChange);
  }

	render(){
		return(
			<div className="container-decksearch">
				DECKS
			</div>
		)
	}
}

export default DeckSearch;