import React, { Component } from 'react';
import { Tooltip, Menu } from 'antd';
import { getLocale } from 'Utils/cardlocale';
import { filterCardQuantity } from 'Utils/cardfilter';

class DeckExportText extends Component {

  downloadTxtFile = () => {
    const { deck } = this.props;

    let cards = filterCardQuantity(deck.cards);

    let FileName = deck.name +".txt";
    
    //Create string for deck
    let DeckData = deck.name + "\n";
    
    //Characters
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
      <Tooltip placement="left" title="Export this deck as a text file">
        <div onClick={this.downloadTxtFile}>
          Text File (.txt)
        </div>
      </Tooltip>
    );
  }
}

export default DeckExportText;