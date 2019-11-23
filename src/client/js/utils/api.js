import axios from 'axios'; 

//Return the full list of available weiss sets
export async function fetchSerieses(lang) {
  return (await axios.get(`/api/serieslist/${lang || ''}`)).data;
}

export async function fetchNeoSets() {
	return (await axios.get(`/api/neosets`)).data;
}

//Return a single weiss set
export async function fetchSeries(seriesid) {
	return (await axios.get(`/api/series/${seriesid}/cards`)).data;
}

export async function fetchDeck(deckid, data) {
	return (await axios.get(`/api/deck/${deckid}`, {
		params: data
	})).data;
}

export async function saveDeck(data) {
	return axios.post(`/api/deck`, data).then((res) => {
		return res
	}).catch(err => {
		return err
	}) 
}

export async function deleteDeck(deckid) {
	return axios.delete(`/api/deck/${deckid}`).then((res) => {
		return res
	}).catch(err => {
		return err
	}) 
}

export async function favoriteDeck(deckid){
	return await axios.post(`/api/deck/favorite/${deckid}`).then((res) => {
		return res.data
	}).catch(err => {
		return err.response.data
	}) ;
}

export async function claimDeck(deckid){
	return await axios.post(`/api/deck/claim/${deckid}`).then((res) => {
		return res.data
	}).catch(err => {
		return err.response.data
	}) ;
}

//Search decks with various parameters
export async function searchDeck(data){
	return (await axios.get(`/api/search/deck`, {
		params:data
	})).data;
}

export async function saveTranslations(seriesid, data){
	return axios.post(`/api/translations/${seriesid}`, data).then((res) => {
		return res.data
	}).catch(err => {
		return err.response.data
	}) ;
}

export async function login(data){
	return axios.post(`/api/login`, data).then((res) => {
		return res.data
	}).catch(err => {
		return err
	}) 
}

export async function logout(){
	return axios.post(`/api/logout`).then((res) =>{
		console.log(res);
	})
}

export async function register(data){
	return axios.post(`/api/register`, data).then((res) =>{
		return res.data
	}).catch(err => {
		console.log(err);
		return err
	})
}

export async function passwordReset(data){
	return axios.post(`/api/reset/${data.token || ''}`, data).then((res) => {
		return res.data
	}).catch(err => {
		return err.response.data
	}) ;
}