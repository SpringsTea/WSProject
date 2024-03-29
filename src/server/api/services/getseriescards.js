'use strict';

/** 
 * @module GetSeriesCards
 */

import Series from '../models/series'
import Card from '../models/card'
import LocaleSelect from '../helpers/user-preferedlocale';

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
        let series = await Series.findById(seriesId).exec();
        if (series) {
            let cards = await Card.find({ 
                series: series._id
            }).limit(1000).exec();
            if(request.user){//Prefered locale check
                cards = LocaleSelect(cards, request.user.config);
            }
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