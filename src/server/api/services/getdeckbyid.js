'use strict';

/** 
 * @module GetDeckById
 */

import GetDeckById from '../helpers/get-deck-by-id'

/**
 * Get Deck By ID
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */

module.exports =  async (request, response, next) => {
    let deckid = request.params.deckid;
    let populate = request.query.populate;

    let deck = await GetDeckById(deckid, populate);

    if(deck && deck.error !== true){
        response.status(200).json(deck)
    }
    else{
        response.status(500).json(deck); 
    }
}