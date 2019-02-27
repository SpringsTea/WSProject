import { Component } from 'react';

import DeckListDisplay from './DeckListDisplay';
import DeckFilters from './DeckFilters';

import DeckSearchStore from '../../stores/DeckSearchStore';

const buildState = () => ({
  pages: DeckSearchStore.getDecks(),
  serieses: DeckSearchStore.getSerieses(),
});

class DeckSearch extends Component {

  state = {
  	...buildState(),
    loading: false,
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckSearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckSearchStore.removeChangeListener(this.onChange);
  }

  handleLoading = (val) => this.setState({loading:val})

	render(){
    const { handleLoading } = this;
    const { pages, serieses, loading } = this.state;

		return(
			<div className="container-decksearch">
        <DeckFilters serieses={serieses} setLoading={handleLoading} />
        <DeckListDisplay pages={pages} setLoading={handleLoading} loading={loading} />
			</div>
		)
	}
}

export default DeckSearch;