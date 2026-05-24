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

//Returns the numerical release number
function decodeRelease(code){
  const str = code;
  const match = str.match(/([A-Z]\d+)-/);

  if( match ){
   return match[1];
  }
  else{
    throw new Error(`Unknown release: ${code}`);
  }
}

function decodeCardSid(code){
  const str = code.toLowerCase();
  const match = str.match(/-(.+)/);

  if (match) {
    return match[1];
  }
  else{
    throw new Error(`Unknown sid: ${code}`);
  }
}

//Colors are stored as image tags: [[blue.gif]]
function decodeColour(colour){
  const match = colour.match(/\[\[(.*?)\.gif\]\]/i);
  if (!match) {
    throw new Error (`Unknown card colour: ${colour}`)
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

function armyCalc(ability){
  let armylimit = 4;
  if(ability.length > 0){
      ability.map((abilitytext) => {
        if(abilitytext.includes('このカードと同じカード名のカードは、デッキに')){//JP text that represents 'you can run up to X copies of this card in your deck'
          //remove all non digits from ability text 
          //The idea being that any number present in this ability text is the number defining how many copies of a card can be run
          const armytext = (abilitytext).replace( /\D/g,'').trim();
          if(armytext){
            armylimit = parseInt(armytext)
          }
          else{
            armylimit = -1;//unlimited
          }
        }
      })
    }
  return armylimit;
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
    id: requireField(card, 'id'),
    cardcode: requireField(card, 'card_number'),
    game: 'WS',
    set: requireField(card, 'title_number'),
    side: mapSide(card.side),
    release: decodeRelease(card.card_number),
    sid: decodeCardSid(card.card_number),
    lang: 'JP',
    cardtype: mapCardType(card.card_kind),
    colour: decodeColour(card.color),
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
        flavor: card.flavor,
        source: 'bushi'
      }
    },
    imagepath: requireField(card, 'picture'),
    armycount: 4
  }))
  .map((card) => ({
    ...card,
    armycount: armyCalc(card.locale.NP.ability)
  }))
}

module.exports = {
  mapCardData
}