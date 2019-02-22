import {Component} from 'react';
import {Input, Row, Col, Button} from 'antd';

import Card from './Card';
import SeriesSelect from './SeriesSelect';
import CardSelector from './CardSelector';
import Filters from '../partials/Builder/CardSelector/Filters';
import DeckSaveModal from '../partials/Builder/DeckSave/DeckSaveModal';

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
  	...buildState(),
  	savemodalopen: false,
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    BuilderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BuilderStore.removeChangeListener(this.onChange);
  }

  handleToggleSaveModal = (bool) =>{
  	this.setState({savemodalopen: bool});
  }

  render() {
    const {handleToggleSaveModal} = this;
    const {selectedCard, serieses, buildercards, deck, savemodalopen} = this.state;
    return (
      <div className="container-builder">
        <DeckSaveModal deck={deck} visible={savemodalopen} togglevisible={handleToggleSaveModal} />
        <Row gutter={16}>
          <Col xxl={8} xl={8} lg={12} md={24}
          			className='container-series-selector nice-scroll'>
            <SeriesSelect serieses={serieses} />
            			<Filters />
            <CardSelector cards={buildercards} />
            <Card data={selectedCard.card} />
          </Col>
          <Col xxl={16} xl={16} lg={12} md={24}>
            <Deck cards={deck} />
            <Button className="btn-deck-save" type="primary" icon="save" size='large' onClick={()=> handleToggleSaveModal(true)}>Save Deck</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Builder;
