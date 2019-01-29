import axios from 'axios'; 

import { charicter, climax, event } from '../constants/stubs/Cards'

export async function fetchTestData() {

  return charicter;
}

//Return the full list of available weiss sets
export async function fetchSerieses() {
  return (await axios.get('api/serieslist/')).data;
}

//Return a single weiss set
export async function fetchSeries(seriesid) {
	return (await axios.get(`api/series/${seriesid}/cards`)).data;
}