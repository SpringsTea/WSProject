const MODEL_PATH = __dirname +'/../../../src/server/api/models';
const SeriesModel = require(`${MODEL_PATH}/series`)

async function getSeries({ side = undefined, release = undefined, expansion = undefined }){

	if( (!side && !release) && !expansion  ){
		return [];
	}

	const query = {
	  ...(side !== undefined && { side }),
	  ...(release !== undefined && { release }),
	  ...(expansion !== undefined && { expansions: expansion }),
	};

	let series = await SeriesModel.findOne(query).exec();

  return series;
}

module.exports = {
	getSeries
}