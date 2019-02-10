import React, { Component } from 'react';

import DeckStore from '../../stores/DeckStore';

const buildState = () => ({
  deck: DeckStore.getDeckData()
});

class DeckView extends Component {

  state = {
  	...buildState()
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.onChange);
  }

	render(){
		const { deck } = this.state;
		return(
			<div className="container-deckview">
				Fuck yeah
			</div>
		)
	}
}

export default DeckView;