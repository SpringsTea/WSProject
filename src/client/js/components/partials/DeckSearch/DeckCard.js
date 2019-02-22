import React, {Component} from 'react';
import {Card} from 'antd';

import {generateCardImageLink} from 'Utils/cardshorthands';

const {Meta} = Card;

class DeckCard extends Component {
  render() {
    const {deck} = this.props;
    return (
      <div className="container-deckcard">
        <Card
          cover={
            <div className="deck-image">
              <img src={generateCardImageLink(deck.cards[0])} />
            </div>
          }
        >
          <Meta
            title={deck.name}
            description={deck.description}
          />
        </Card>
      </div>
    );
  }
}

export default DeckCard;
