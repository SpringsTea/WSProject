'use strict'

/** 
 * @module SaveTranslationAttributes
 */

import Translations from '../../models/translations'
const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

/**
 * Save series translation attributes
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
	const seriesid = request.params.seriesid;
	const attributes = request.body.attributes;
	const user = request.user;

	let existingtrans = await Translations.findOne({seriesid: seriesid, lang: 'EN'}).exec();
	//If this series already has a translation document
	if( existingtrans ){
		existingtrans.attributes = attributes
		existingtrans.moddate = Date.now();
		existingtrans.moduser= user;
		console.log(attributes)
		existingtrans.save();
		response.status(200).send({ success: true, attributes: attributes });
	}
	//Otherwise, create a new translation document
	else{

		let translationsobj = {
			seriesid: ObjectId(seriesid),
			lang: 'EN',
			attributes: attributes,
			moddate: Date.now(),
			moduser: request.user
		}

		let createdTrans = await Translations.create(translationsobj); 
        response.status(200).send({ success: true, attributes: attributes });
	}
}