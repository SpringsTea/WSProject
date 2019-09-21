import { Component } from 'react';
import { throttle } from 'throttle-debounce';

import DeckListDisplay from './DeckListDisplay';
import DeckFilters from './DeckFilters';

import DeckSearchStore from '../../stores/DeckSearchStore';
import { searchDeck } from 'Utils/api';
import setParam from 'Utils/querystringman';
import { receiveDecks } from 'Actions/DeckSearchActions';

const buildState = () => ({
  pages: DeckSearchStore.getDecks(),
  serieses: DeckSearchStore.getSerieses(),
  neosets: DeckSearchStore.getNeoSets(),
});

class DeckSearch extends Component {

  state = {
  	...buildState(),
    loading: false,
    filters: this.props.filters || {},
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    DeckSearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    DeckSearchStore.removeChangeListener(this.onChange);
  }

  handleFilter = (value, prop) =>{
    const { updateDecks } = this;
    let { filters } = this.state;

    let val = value ? value : undefined;//setting undefined fill remove key from querystring

    filters[prop] = val;
    this.setState({filters}, updateDecks);
  }

  handleTextFilter = throttle( 1000, (value) =>{
    const { updateDecks } = this;
    let { filters } = this.state;

    if( value.length <= 3 && value.length > 0 ){
      return false;
    }

    filters.text = value ? value : undefined;
    this.setState({filters}, updateDecks);
  })

  updateDecks = async () =>{
    const { handleLoading } = this;
    const { filters } = this.state;

    handleLoading(true);
    const [decks] = await Promise.all([
      searchDeck({...filters, page: 1})
    ]);   

    setParam({...filters, ...{invalid: undefined, username: undefined, page:1}})

    receiveDecks(decks);
    handleLoading(false);    
  }

  handleLoading = (val) => this.setState({loading:val})

	render(){
    const { handleLoading, handleFilter, handleTextFilter } = this;
    const { pages, serieses, neosets, loading, filters } = this.state;

		return(
			<div className="container-decksearch">
        <DeckFilters 
          handleFilter={handleFilter} handleTextFilter={handleTextFilter} setLoading={handleLoading} 
          serieses={serieses} neosets={neosets} filters={filters}
          />
        <DeckListDisplay filters={filters} pages={pages} setLoading={handleLoading} loading={loading} />
			</div>
		)
	}
}

export default DeckSearch;