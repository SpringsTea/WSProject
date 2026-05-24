const path = require('path');

const MODEL_PATH = __dirname +'/../../../src/server/api/models';
const CardModel = require(`${MODEL_PATH}/card`)

async function getCard({ cardcode }){

	let card = await CardModel.findOne({ cardcode }).exec();

  return card;
}

async function createCard(card, series){
	const imgext = path.extname(card.imagepath)
	await CardModel.create({...card, 
		series: series._id,
		imagepath: `JP/${card.set}/${card.side}${card.release}/${card.sid}${imgext}`,
		}, function(err, data){
			if(err){
				console.log('Something went wrong', err);
			}
			else{
				console.log('Card added:', card.cardcode);
			}
		})
}

module.exports = {
	getCard,
	createCard
}