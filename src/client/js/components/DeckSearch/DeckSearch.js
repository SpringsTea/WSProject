import React, {Component} from 'react';
import {Row, Col} from 'antd';

import DeckCard from '../partials/DeckSearch/DeckCard';

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

    render() {
      const {decks} = this.state;

      return (
        <div className="container-decksearch">
          <Row gutter={18}>
            {
              decks.map( (deck) =>
                <Col span={3} key={deck.deckid}>
                  <DeckCard deck={deck} />
                </Col>
              )
            }
          </Row>
        </div>
      );
    }
}

export default DeckSearch;
