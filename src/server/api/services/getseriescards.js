'use strict';

/** 
 * @module GetSeriesCards
 */

import Series from '../models/series'
import Card from '../models/card'

/**
 * Get Series Cards
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    let seriesId = request.params.id;
    try {
        let docs = await Series.find({_id: seriesId}).limit(1).exec();
        if (docs.length > 0) {
            let cards = await Card.find({ 
                set: docs[0].set, 
                release: docs[0].release 
            }).limit(300).exec();
            response.status(200).json(cards)
        } else {
            throw new Error("Set was not found");
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}