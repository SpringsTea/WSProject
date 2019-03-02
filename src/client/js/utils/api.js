import axios from 'axios'; 

//Return the full list of available weiss sets
export async function fetchSerieses(lang = "JP") {
  return (await axios.get(`/api/serieslist/${lang}`)).data;
}

//Return a single weiss set
export async function fetchSeries(seriesid) {
	return (await axios.get(`/api/series/${seriesid}/cards`)).data;
}

export async function fetchDeck(deckid) {
	return (await axios.get(`/api/deck/${deckid}`)).data;
}

export async function saveDeck(data) {
	return (await axios.post(`/api/deck`, data));
}

//Search decks with various parameters
export async function searchDeck(data){
	return (await axios.get(`/api/search/deck`, {
		params:data
	})).data;
}