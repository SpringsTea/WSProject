'use strict';

/** 
 * @module SearchDeck
 */

import Card from '../models/card'

const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

/**
 * Search deck given various parameters
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async ({params, user = {}}, response, next) => {
    try {
        const limit = 10;
        const searchtext = params.query;
        const lang = user.preferedlocale || 'EN';

        let query = {
            lang: lang,
            'locale.EN.name': { "$regex": searchtext, "$options": "i" }
        }

        let cards = await Card.find(query).select(`_id locale.${lang}.name imagepath`).limit(limit).exec();

        console.log(query)              

        response.status(200).json(cards)
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}