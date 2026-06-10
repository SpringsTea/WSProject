const axios = require('axios');

const { mapCardData } = require('./CardMap');

const url = 'https://ws-tcg.com/manage/CardListUser/searchJson'//Returns a list of cards given an expansion id as a parameter
const headers = {
  accept: 'application/json, text/javascript, */*; q=0.01',
  referer: 'https://ws-tcg.com/cardlist/',
  'x-requested-with': 'XMLHttpRequest',
  'user-agent': 'Mozilla/5.0'
};

async function getCards({ expansion, title_number }) {
  try {
    let allCards = [];

    const firstRes = await axios.get(url, {
      params: {
        expansion : expansion?.id,
        title_number
      },
      headers
    });

    const { items, page_count } = firstRes.data;
    allCards.push(...items);

    // loop remaining pages
    for (let page = 2; page <= page_count; page++) {
      const res = await axios.get(url, {
        params: {
          expansion: expansion?.id,
          title_number,
          page
        },
        headers
      });

      allCards.push(...res.data.items);
    }

    allCards = mapCardData(allCards);

    return allCards;

  } catch (err) {
    console.log(err)
    console.log('Request error', url, err.response);
    return [];
  }
}

module.exports = {
	getCards
}