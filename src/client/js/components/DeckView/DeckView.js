import React, { Component } from 'react';
import { Row, Col, Alert } from 'antd';
import Sticky from 'react-stickynode';
import { isMobile } from 'react-device-detect';

import DeckHeader from './DeckHeader';
import Card from '../Builder/Card';
import CardMobile from '../Builder/CardMobile';
import DeckDisplay from '../partials/DeckView/DeckDisplay';

import { getLocale } from 'Utils/cardlocale.js';

import DeckStore from '../../stores/DeckStore';
import { selectCard } from 'Actions/DeckActions';

const buildState = () => ({
  deck: DeckStore.getDeckData(),
  selectedCard: DeckStore.getSelectedCard(),
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

  handleToggleCardLock = (card) =>{
    selectCard({card}, true);
  }

	render(){
		const { handleToggleCardLock } = this;
		const { loggedin, userid } = this.props;
		const { deck, selectedCard } = this.state;

		return(
			<div className="container-deckview">
				{
					deck.valid !== true &&
					<Alert message="This deck is not valid, and will not appear in searches" banner />
				}
				<DeckHeader cards={deck.cards} deck={deck} loggedin={loggedin} currentuser={userid || null} />
				<Row gutter={8}>
					<Col xxl={16} xl={14} lg={12} md={24}>
						<DeckDisplay deck={deck} />
					</Col>
					<Col xxl={6} xl={8} lg={10} md={24}>
					{
						!!isMobile ?
						<CardMobile 
			                card={selectedCard.card} 
			                locale={getLocale(selectedCard.card)} 
			                locked={selectedCard.lock} 
			                count={deck.length > 0 && !!selectedCard.card && deck.reduce((acc, val) => {//number of instances of selected card currently in deck
			                  return acc + (val._id === selectedCard.card._id);
			                }, 0)}
			                onCardSelect={handleToggleCardLock} 
			                onClose={handleToggleCardLock}
			              />
						:						
						<Sticky enabled={true} top={50} >
						    <Card card={selectedCard.card} locale={getLocale(selectedCard.card)} locked={selectedCard.lock} onCardSelect={handleToggleCardLock} />
						</Sticky>	
					}
					</Col>
				</Row>
			</div>
		)
	}
}

export default DeckView;