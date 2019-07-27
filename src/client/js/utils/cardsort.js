import { cardtypes, colours } from '../constants/sortorder';

export let sortall = (a,b) => {
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

  //Sort by id last so that sorted lists are always consistant
  //With out this, the order of cards can varry depending on their original order in the array
  if( a._id < b._id ){
    return -1
  }
  if( a._id > b._id ){
    return 1
  }

  return 0
}

export let sortlevel = (a,b) => {
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
  
  if( a._id < b._id ){
    return -1
  }
  if( a._id > b._id ){
    return 1
  }

  return 0
}