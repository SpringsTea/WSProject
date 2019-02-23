import { Component } from 'react';

import DeckListDisplay from './DeckListDisplay';
import DeckFilters from './DeckFilters';

import DeckSearchStore from '../../stores/DeckSearchStore';

const buildState = () => ({
  decks: DeckSearchStore.getDecks(),
  serieses: DeckSearchStore.getSerieses(),
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
    const { decks, serieses } = this.state;

		return(
			<div className="container-decksearch">
        <DeckFilters serieses={serieses} />
        <DeckListDisplay decks={decks} />
			</div>
		)
	}
}

export default DeckSearch;