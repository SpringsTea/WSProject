import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { getLocale } from 'Utils/cardlocale';
import { filterCardQuantity } from 'Utils/cardfilter';

class DeckExportCSV extends Component {
  
  downloadTxtFile = () => {
    const { deck } = this.props;

    let cards = filterCardQuantity(deck.cards);

    let FileName = deck.name +".csv";
    
    //CSV Headers
    let DeckData = "Code,Name,Quantity\n";
    
    //Characters
    cards.filter( (card) => card.cardtype == 'CH' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "," + locale.name + "," + card.quantity + "\n";
    })

    //Events
    cards.filter( (card) => card.cardtype == 'EV' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "," + locale.name + "," + card.quantity + "\n";
    })

    //Climaxes
    cards.filter( (card) => card.cardtype == 'CX' && card.sid).map(function (card, i){
      var locale = getLocale(card);
      var cardcode = card.set+"/"+card.side+card.release+"-"+card.sid;
      DeckData +=  cardcode + "," + locale.name + "," + card.quantity + "\n";
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
      <Tooltip placement="left" title="Export this deck as a comma-separted value file for spreadsheet software">
        <div onClick={this.downloadTxtFile}>
          Comma-separated Value (.csv)
        </div>
      </Tooltip>
    );
  }
}

export default DeckExportCSV;