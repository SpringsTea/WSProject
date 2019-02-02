import { cardtypes, colours } from '../constants/sortorder';

export function sortall(cards){
  console.log('sorting all cards')
  return cards.sort( (a,b) => {

    //Card type
    if( cardtypes.indexOf(a.cardtype) < cardtypes.indexOf(b.cardtype) ){
      return -1
    }
    if( cardtypes.indexOf(a.cardtype) > cardtypes.indexOf(b.cardtype) ){
      return 1
    }
    
    //Color
    if( colours.indexOf(a.colour) < colours.indexOf(b.colour) ){
      return -1
    }
    if( colours.indexOf(a.colour) > colours.indexOf(b.colour) ){
      return 1
    }

    //Level
    if( a.level < b.level ){
      return -1
    }
    if( a.level > b.level ){
      return 1
    }

    //Cost
    if( a.cost < b.cost ){
      return -1
    }
    if( a.cost > b.cost ){
      return 1
    }

    return 0
  })
}