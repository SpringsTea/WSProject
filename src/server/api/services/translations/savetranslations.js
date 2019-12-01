'use strict'

/** 
 * @module SaveTranslations
 */

import Translations from '../../models/translations'
const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

/**
 * Save series translations
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
	const seriesid = request.params.seriesid;
	const trans = request.body;
	const user = request.user;

	if( !user || !user.roles.includes('translator') ){
        response.redirect("/");
        return false;
    }

	let existingtrans = await Translations.findOne({seriesid: seriesid, lang: 'EN'}).exec();
	//If this series already has a translation document
	if( existingtrans ){
		//For each new or modified trans, update or push into the existingtrans
		trans.filter((t) => t.edited === true)
		.forEach( (t) => {
			let i = existingtrans.translations.findIndex( (et) => ObjectId(et.cardid) == t.cardid ) 
			if( i >= 0 ){
				existingtrans.translations[i] = {...t, moduser: user, moddate: Date.now()}
			}
			else{
				existingtrans.translations.push({...t, moduser: user, moddate: Date.now()})
			}
		})

		existingtrans.moddate = Date.now();
		existingtrans.moduser= user;
		existingtrans.save();
		response.status(200).send({ success: true, translations: existingtrans });
	}
	//Otherwise, create a new translation document
	else{

		let translationsobj = {
			seriesid: ObjectId(seriesid),
			lang: 'EN',
			translations: trans.map( (translation) => {
				return {
					cardid: ObjectId(translation.cardid),
					name: translation.name,
					ability: translation.ability,
					moduser: user
				}
			} ),
			moddate: Date.now(),
			moduser: request.user
		}

		let createdTrans = await Translations.create(translationsobj); 
        response.status(200).send({ success: true, translations: createdTrans });
	}
}