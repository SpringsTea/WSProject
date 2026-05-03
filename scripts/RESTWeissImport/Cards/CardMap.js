/*
CardMap takes data returned from bushis new REST api and converts it into encores interal card model.
*/

//Internally the card side is stored as -1 for W and -2 for S
function mapSide(side){
  switch(side){
    case '-1':
      return 'W'
      break;
    case '-2':
      return 'S'
      break;
    case '-3':
      return 'WS'
      break;
    default:
      throw new Error(`Unknown side: ${side}`);
      return ''
  }
}

function mapCardType(kind){
  switch(kind){
    case '2': 
      return 'CH'
      break;
    case '3':
      return 'EV'
      break;
    case '4':
      return 'CX'
      break;
    default:
      throw new Error (`Unknown card type: ${kind}`)
      return ''
  }
}

//Colors are stored as image tags: [[blue.gif]]
function decodeColor(color){
  const match = color.match(/\[\[(.*?)\.gif\]\]/i);
  if (!match) {
    throw new Error (`Unknown card color: ${color}`)
    return ''
  }

  return match[1].toUpperCase();
}

function decodeSoul(soul){
  if (!soul || soul === '-') return 0;

  const matches = soul.match(/\[\[soul\.gif\]\]/g);
  return matches ? matches.length : 0;
}

//I dont currently map trigger names to anything,
//But there are so inconsistancies sometimes with oldercards having COMEBACK vs SALVAGE
function deodeTrigger(triggerstring){
  if (!triggerstring || triggerstring === '-') return [];

  const matches = triggerstring.match(/\[\[(.*?)\.gif\]\]/g);
  if (!matches) return [];

  return matches.map(m => {
    const inner = m.match(/\[\[(.*?)\.gif\]\]/);
    return inner ? inner[1].toUpperCase() : null;
  }).filter(Boolean);
}

//attributes are stored in 3 different "feature" parameters on the card.
//If a card has less that 3 attributes the feature will be '-'
function decodeFeatures({ feature1, feature2, feature3 }){
  let attributes = [];

  if( !!feature1 && feature1 !== '-' ){
    attributes.push(feature1)
  }
  if( !!feature2 && feature2 !== '-' ){
    attributes.push(feature2)
  }
  if( !!feature3 && feature3 !== '-' ){
    attributes.push(feature3)
  }

  return attributes;
}

function decodeCardText(cardtext){
  if (!cardtext || cardtext === '-') return [];

  return cardtext
    //This split handles the three tags that bushi uses inconsistantly:
    //"<br>", "<br/>", "<br />"
    .split(/<br\s*\/?\s*>/i)
    .map(line => line.trim())
    //This line will replace image tags so that [[gate.gif]] becomes [GATE]
    .map(line => line.replace(/\[\[(.*?)\.[a-z0-9]+\]\]/gi, (_, name) => {
      return `[${name.toUpperCase()}]`;
    }))
    .filter(Boolean);
}

//Throw an error if bushi removes or changes the name of a prop so we dont import garbage
function requireField(obj, field, context = '') {
  if (obj[field] == null) {
    throw new Error(`Missing ${field} ${context}`);
  }
  return obj[field];
}

function mapCardData(cards = [], expansion){
  return cards.map((card) => ({
    cardcode: requireField(card, 'card_number'),
    game: 'WS',
    set: requireField(card, 'title_number'),
    side: mapSide(card.side),
    release: null,//This will need to be mapped somehow to an encore series
    lang: 'JP',
    cardtype: mapCardType(card.card_kind),
    color: decodeColor(card.color),
    level: parseInt(card.level) || 0, //CXs will have level "-"
    cost: parseInt(card.cost) || 0, //CXs will have cost "-"
    power: parseInt(card.power) || 0,
    soul: decodeSoul(card.soul),
    rarity: requireField(card, 'rare'),
    trigger: deodeTrigger(card.card_trigger),
    expansion: requireField(card, 'expansion'),
    locale: {
      NP: {
        name: requireField(card, 'card_name'),
        attributes: decodeFeatures(card),
        ability: decodeCardText(card.text),
        source: 'bushi'
      }
    },
    imagepath: requireField(card, 'picture'),
    //TODO calculate this before import
    armycount: 4
  }))
}

module.exports = {
  mapCardData
}