import React from 'react';
import Img from 'react-image';
import { 
  QuestionCircleOutlined
} from '@ant-design/icons';
import { generateCardImageLink } from 'Utils/cardshorthands';

export default function DeckImage({card}) {

  return (
    <div className="container-deckcard" style={{maxWidth: '200px'}}>
      <div className="deck-image">
          <Img
          src={[
            generateCardImageLink(card),
          ]}
          unloader={<QuestionCircleOutlined className="image-not-found" />}
          />
        </div>
    </div>
  )
}