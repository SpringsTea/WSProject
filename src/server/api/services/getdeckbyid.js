'use strict';

/** 
 * @module GetDeckById
 */

import Deck from '../models/deck'

const GetDeckById = async (deckid) => {
    try {
        let docs = await Deck.find(
            {deckid: deckid}, 
            '-_id cards datemodified deckid description name userid valid sets neo_fail' //valid neo_fail neo_sets'
        ).limit(1).populate('cards').populate('sets').exec();
        if( docs.length > 0 ){
           return docs[0]
        } else {
            return null;
        }
    } catch (error) {
        return {
            error: true,
            message: 'Deck was not found'
        };
    }
}

/**
 * Get Deck By ID
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */

module.exports = 
{
    route: async (request, response, next) => {
        let deckid = request.params.deckid;
        let deck = await GetDeckById(deckid);

        if(deck && deck.error !== true){
            response.status(200).json(deck)
        }
        else{
            response.status(500).json(deck); 
        }
    },
    GetDeckById: GetDeckById
}