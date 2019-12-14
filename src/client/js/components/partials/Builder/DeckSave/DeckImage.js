import React from 'react';
import Img from 'react-image';
import { Icon } from 'antd'
import { generateCardImageLink } from 'Utils/cardshorthands';

export default function DeckImage({card}) {

  return (
    <div className="container-deckcard" style={{maxWidth: '200px'}}>
      <div className="deck-image">
          <Img
          src={[
            generateCardImageLink(card),
          ]}
          unloader={<Icon className="image-not-found" type="question-circle" />}
          />
        </div>
    </div>
  )
}