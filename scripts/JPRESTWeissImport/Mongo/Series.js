const MODEL_PATH = __dirname +'/../../../src/server/api/models';
const SeriesModel = require(`${MODEL_PATH}/series`)

async function getSeries({ side = undefined, release = undefined, expansion = undefined }){

	if( (!side && !release) && !expansion  ){
		return {};
	}

	const query = {
	  ...(side !== undefined && { side }),
	  ...(release !== undefined && { release }),
	  ...(expansion !== undefined && { expansions: expansion }),
	};

	let series = await SeriesModel.findOne(query).exec();

  return series;
}

async function createSeries(series){
	if( !series.set || !series.side || !series.release  ){
		return null;
	}

	try{
		const res = await SeriesModel.create({
			...series,
			name: `${series.set}/${series.side}-${series.release}`,
			game: 'WS',
			enabled: false
		})
		console.log('Series Created:', res)
		return res;
	}
	catch(err){
		console.log("Something went wrong", err)
		throw err;
	}	
}

module.exports = {
	getSeries,
	createSeries
}