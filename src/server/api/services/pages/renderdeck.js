'use strict';

import { GetDeckById } from '../getdeckbyid';

/** 
 * @module RenderDeck
 */

/**
 * Render Deck
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    let deckid = request.params.deckid;
    let deck = await GetDeckById(deckid);
    console.log("Fire!");
    try {
        response.render("deck", { deckid: deckid, deckname: deck.name });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}