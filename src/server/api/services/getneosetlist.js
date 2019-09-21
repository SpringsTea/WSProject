'use strict';

/** 
 * @module GetNeoSetList
 */

import NeoSet from '../models/neoset'

/**
 * Get Series Cards
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        let neosets = await NeoSet.find({enabled: true}).select('-enabled').exec();
        response.status(200).json(neosets);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}