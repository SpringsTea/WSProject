import { Component } from 'react';
import { Input, Row, Col, Button, Alert, Flex, Space } from 'antd';
import { 
  SaveOutlined
} from '@ant-design/icons';

import { isMobile } from 'react-device-detect';

import Card from './Card';
import CardMobile from './CardMobile';
import SeriesSelect from './SeriesSelect';
import CardSelector from './CardSelector';
import Filters from '../partials/Builder/CardSelector/Filters';
import DeckSaveModal from '../partials/Builder/DeckSave/DeckSaveModal';
import Deck from './Deck';
import ImportDeck from './ImportDeck';

import { getLocale } from 'Utils/cardlocale';

import BuilderStore from '../../stores/BuilderStore';
import { selectCard } from 'Actions/BuilderActions';

const buildState = () => ({
  serieses: BuilderStore.getSeriesesData(),
  buildercards: BuilderStore.getBuilderCards(),
  selectedCard: BuilderStore.getSelectedCard(),
  deck: BuilderStore.getDeckCards(),
  deckdata: BuilderStore.getDeckData(),
  builderfilters: BuilderStore.getBuilderFilters(),
  attributes: BuilderStore.getCardAttributes(),
  rarities: BuilderStore.getCardRarities(),
});

class Builder extends Component {

  state = {
  	...buildState(),
  	savemodalopen: false
  }

  onChange = () => this.setState(buildState);

  componentDidMount() {
    BuilderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    BuilderStore.removeChangeListener(this.onChange);
  }

  handleToggleSaveModal = (bool) =>{
  	this.setState({savemodalopen:bool})
  }

  handleToggleCardLock = (card) =>{
    selectCard({card}, true);
  }

	render(){
		const { handleToggleSaveModal, handleToggleCardLock } = this;
    const { loggedin, mode, theme } = this.props;
		const { selectedCard, serieses, buildercards, builderfilters, attributes, rarities, deck, deckdata, savemodalopen } = this.state;
		return(
			<div className={`container-builder ${theme}`}>
        {
          loggedin !== "true" &&
          <Alert type="info" className="login-alert" message={ <div>
            You are not signed in. You can create decks anonymously, but you will be unable to edit or remove them later. <a href="/login">Login</a> to keep your decks!
          </div> } closable />
        }
				<DeckSaveModal deck={deck} mode={mode} deckdata={deckdata} visible={savemodalopen} togglevisible={handleToggleSaveModal} />
				<Row gutter={16}>
					<Col xxl={8} xl={8} lg={12} md={24}
          			className='container-series-selector nice-scroll'>
						<SeriesSelect serieses={serieses} />
            <Filters attributes={attributes} rarities={rarities} />
						<CardSelector isMobile={isMobile} cards={buildercards} filters={builderfilters} />
            {
              isMobile ?
              <CardMobile 
                card={selectedCard.card} 
                locale={getLocale(selectedCard.card)} 
                locked={selectedCard.lock} 
                count={deck.length > 0 && !!selectedCard.card && deck.reduce((acc, val) => {//number of instances of selected card currently in deck
                  return acc + (val._id === selectedCard.card._id);
                }, 0)}
                onCardSelect={handleToggleCardLock} 
                onClose={handleToggleCardLock}
                allowDeckControls 
              />
              :
						  <Card card={selectedCard.card} locale={getLocale(selectedCard.card)} locked={selectedCard.lock} onCardSelect={handleToggleCardLock} allowDeckControls /> 
            }
          </Col>
					<Col xxl={16} xl={16} lg={12} md={24}> 
						<Deck cards={deck} />
            <ImportDeck />
            <Button className="btn-deck-save" type="primary" icon={<SaveOutlined />} size='large' onClick={()=> handleToggleSaveModal(true)}>Save Deck</Button>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Builder;