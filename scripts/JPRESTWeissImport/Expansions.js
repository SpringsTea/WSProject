const axios = require('axios');

const url = 'https://ws-tcg.com/manage/CardListUser/filter-options'//Returns a list of all serieses

async function getExpansions( { id, created, updated } ){
	return axios.get(url, {
		 headers: {
	      accept: 'application/json, text/javascript, */*; q=0.01',
	      referer: 'https://ws-tcg.com/cardlist/',
	      'x-requested-with': 'XMLHttpRequest',
	      'user-agent': 'Mozilla/5.0'
	    }
	})
    .then((res) => {
      let serieslist = res.data.expansions.sort((a, b) => new Date(b.update_date) - new Date(a.update_date));
      if( !!id ){
      	serieslist = serieslist.filter((item) => item.id == id)
      }

      if( !!created ){
      	serieslist = serieslist.filter(({ create_date }) => {
      		return new Date(create_date) > new Date(created); 
      	})
      }

      if( !!updated ){
      	serieslist = serieslist.filter(({ update_date }) => {
      		return new Date(update_date) > new Date(updated); 
      	})
      }

      return serieslist;

    })
    .catch((err) => {
      console.log(err)
      console.log('Request error', url, err.response)
      return []    
    })
}

module.exports = {
	getExpansions
}