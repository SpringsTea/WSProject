'use strict';

/** 
 * @module SearchDeck
 */

import Deck from '../models/deck'

/**
 * Search deck given various parameters
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async ({query:params}, response, next) => {

	const limit = parseInt(params.limit) || 10;
    try {
        let query = Deck.find(
            {  }, 
            '-_id cards datemodified datecreated deckid description name userid valid neo_sets'
        )
        .limit(limit)
        .populate({
        	path: 'cards',
        	options: {
        		limit: 1
        	}
        })
        .where('valid').equals( params.invalid !== undefined ? false : true )//valid decks only be default
        .sort('-datecreated')

        //Filter by one set
        if( params.set ){
            query.where({ sets : params.set })
        }


        let docs = await query.exec();
        response.status(200).json(docs)
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}