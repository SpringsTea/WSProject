import { cardtypes } from '../constants/sortorder';

export function sortall(cards){
  console.log('sorting all cards')
  return cards.sort( (a,b) => {
    if( cardtypes.indexOf(a.cardtype) < cardtypes.indexOf(b.cardtype) ){
      return -1
    }
    if( cardtypes.indexOf(a.cardtype) > cardtypes.indexOf(b.cardtype) ){
      return 1
    }
    return 0
  })
}