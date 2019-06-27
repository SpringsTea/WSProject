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

    let query = {
        enabled: {$ne: false}//not false allows defaults to apply
    };

    if(request.params.lang){
        query.lang = request.params.lang;
    }

    try {
        let docs = await Series.find(query)
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