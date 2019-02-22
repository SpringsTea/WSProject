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
WSS_SERIES.forEach( (wss_series) => {
  const WSS_RELEASES = readdirSync(WSS_PATH+wss_series).filter((f) => statSync(join(WSS_PATH+wss_series, f)).isDirectory());

  WSS_RELEASES.forEach( ( wss_release ) =>{
    const wss_files = readdirSync(`${WSS_PATH}${wss_series}/${wss_release}`);

    const set = [];// Put all converted cards into this new set
    wss_files.filter(( file ) => extname(file) === '.json').forEach( (wss_file) => {
      const wss_content = readFileSync(`${WSS_PATH}${wss_series}/${wss_release}/${wss_file}`, {encoding: 'utf8'});

      const wss_card = JSON.parse(wss_content);

      const card = {
        sid: wss_card.id,
        name: cleanText(wss_card.name),
        set: wss_card.set,
        side: wss_card.side,
        release: wss_card.release,
        cardtype: wss_card.cardType,
        colour: wss_card.colour,
        level: parseInt(wss_card.level),
        cost: parseInt(wss_card.cost),
        power: parseInt(wss_card.power),
        soul: parseInt(wss_card.soul),
        rarity: wss_card.rarity,
        attributes: wss_card.specialAttrib || [],
        trigger: wss_card.trigger || [],
        ability: [],
      };

      wss_card.ability && wss_card.ability.forEach( (text, i) => {
        card.ability.push(cleanText(text));
      });

      set.push(card);
    });

    writeFile(SETDATA_PATH + wss_release+'.json', JSON.stringify(set), 'utf8', (res) => console.log(res) );
  });
});

function cleanText(text) {
  let cleantext = text;
  cleantext = cleantext.replace(/[\u201C\u201D]/g, '\"');
  cleantext = cleantext.replace(/[\u2019]/g, '\'');

  return cleantext;
}
