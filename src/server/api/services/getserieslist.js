'use strict';

/** 
 * @module GetSeriesList
 */

import Series from '../models/series'

/**
 * Get Series List
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        let docs = await Series.find()
        .sort({ name: 1 })
        .exec();
        console.log('Series list requested');
        response.status(200).json(docs);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}