import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { getLocale } from 'Utils/cardlocale';
import { filterCardQuantity } from 'Utils/cardfilter';

class DeckExport extends Component {
  /*sumCardQuantity(cards = [], type) {
    return cards.filter((card) => card.cardtype === type).length;
  }*/

  downloadTxtFile = () => {
    const { sumCardQuantity } = this;
    const { deck } = this.props;

    let cards = filterCardQuantity(deck.cards);

    /*const typedata = [
      { "name": 'Character', "value": sumCardQuantity(cards, 'CH') },
      { "name": 'Event', "value": sumCardQuantity(cards, 'EV') },
      { "name": 'Climax', "value": sumCardQuantity(cards, 'CX') }
    ];*/

    let FileName = deck.deckid +".txt";
    
    //Create string for deck
    let DeckData = deck.name + "\n";
    
    //Characters  ("+sumCardQuantity(cards, 'CH')+"
    DeckData += "Characters \n";
    cards.filter( (card) => card.cardtype == 'CH' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "\t" + locale.name + "\t" + card.quantity + "\n";
    })

    //Events
    DeckData += "Events \n";
    cards.filter( (card) => card.cardtype == 'EV' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "\t" + locale.name + "\t" + card.quantity + "\n";
    })

    //Climaxes
    DeckData += "Climaxes \n";
    cards.filter( (card) => card.cardtype == 'CX' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "\t" + locale.name + "\t" + card.quantity + "\n";
    })

    const element = document.createElement("a");
    const file = new Blob([DeckData], {type: 'text/plain', endings:'native'});
    element.href = URL.createObjectURL(file);
    element.download = FileName
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <Tooltip placement="top" title="Export this deck as a text file">
      <Button type="primary" icon="export" onClick={this.downloadTxtFile}>
        Export Deck (.txt)
      </Button>
      </Tooltip>
    );
  }
}

export default DeckExport;