const {readdirSync, readFileSync, writeFile, statSync} = require('fs');
const {join, extname} = require('path');
const WSS_PATH = process.env.WSS_PATH || './Cards/';
const SETDATA_PATH = './SetData/';

let WSS_SERIES = readdirSync(WSS_PATH).filter((f) => statSync(join(WSS_PATH, f)).isDirectory());

// add series as env var to only convert that set
// SERIES=AOT node ConverWSSCards.js
if ( process.env.SERIES ) {
  WSS_SERIES = WSS_SERIES.filter( ( set ) => set === process.env.SERIES );
}

// SERIES IE. AOT LLS etc
WSS_SERIES.forEach( (wssSeries) => {
  const WSS_RELEASES = readdirSync(WSS_PATH+wssSeries).filter((f) => statSync(join(WSS_PATH+wssSeries, f)).isDirectory());

  WSS_RELEASES.forEach( ( wssRelease ) =>{
    const wssFiles = readdirSync(`${WSS_PATH}${wssSeries}/${wssRelease}`);

    const set = [];// Put all converted cards into this new set
    wssFiles.filter(( file ) => extname(file) === '.json').forEach( (wssFile) => {
      const wssContent = readFileSync(`${WSS_PATH}${wssSeries}/${wssRelease}/${wssFile}`, {encoding: 'utf8'});

      const wssCard = JSON.parse(wssContent);

      const card = {
        sid: wssCard.id,
        name: cleanText(wssCard.name),
        set: wssCard.set,
        side: wssCard.side,
        release: wssCard.release,
        cardtype: wssCard.cardType,
        colour: wssCard.colour,
        level: parseInt(wssCard.level),
        cost: parseInt(wssCard.cost),
        power: parseInt(wssCard.power),
        soul: parseInt(wssCard.soul),
        rarity: wssCard.rarity,
        attributes: wssCard.specialAttrib || [],
        trigger: wssCard.trigger || [],
        ability: [],
      };

      wssCard.ability && wssCard.ability.forEach( (text, i) => {
        card.ability.push(cleanText(text));
      });

      set.push(card);
    });

    writeFile(SETDATA_PATH + wssRelease+'.json', JSON.stringify(set), 'utf8', (res) => console.log(res) );
  });
});

function cleanText(text) {
  let cleantext = text;
  cleantext = cleantext.replace(/[\u201C\u201D]/g, '\"');
  cleantext = cleantext.replace(/[\u2019]/g, '\'');

  return cleantext;
}
