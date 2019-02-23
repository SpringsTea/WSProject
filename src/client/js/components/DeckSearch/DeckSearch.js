import { Component } from 'react';

import DeckListDisplay from './DeckListDisplay';

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
    const { decks } = this.state;

		return(
			<div className="container-decksearch">
        <DeckListDisplay decks={decks} />
			</div>
		)
	}
}

export default DeckSearch;