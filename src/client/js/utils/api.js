import { charicter, climax, event } from '../constants/stubs/Cards'
import { Serieses } from '../constants/stubs/Serieses'
import { Konosuba } from '../constants/stubs/Series'

export async function fetchTestData() {

  return charicter;
}

//Return the full list of available weiss sets
export async function fetchSerieses() {
	return Serieses;
}

//Return a single weiss set
export async function fetchSeries() {
	return Konosuba;
}