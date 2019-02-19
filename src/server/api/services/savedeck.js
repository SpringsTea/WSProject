'use strict';

/** 
 * @module SaveDeck
 */

import Deck from '../models/deck'
// import DeckValidator from '../helpers/deck-validator'

/**
 * Get Series Cards
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        // parse request body
        const d = request.body;
        let deckdata = {
            ...d,
            userid: null,
            valid: d.cards && d.cards.length === 50 //false
        };

        // determine neo standard legality NOTE: Disabled until approved
        // let deckLegality = DeckValidator(deckdata);
        // deckdata.valid = deckLegality.neoLegal;
        // deckdata.neo_sets = deckLegality.neoSets;
        // deckdata.neo_fail = deckLegality.failReason;

        // create deck 
        let createdDeck = await Deck.create(deckdata);
        response.status(200).send({ deck: createdDeck });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}