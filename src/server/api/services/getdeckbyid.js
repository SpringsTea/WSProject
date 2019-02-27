'use strict';

/** 
 * @module GetDeckById
 */

import Deck from '../models/deck'

/**
 * Get Deck By ID
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    let deckId = request.params.deckid;
    try {
        let docs = await Deck.find(
            {deckid: deckId}, 
            '-_id cards datemodified deckid description name userid valid sets neo_fail' //valid neo_fail neo_sets'
        ).limit(1).populate('cards').exec();
        if( docs.length > 0 ){
            response.status(200).json(docs[0])
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Deck was not found'
        });
    }
}