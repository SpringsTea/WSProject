'use strict';

import GetDeckById from '../../helpers/get-deck-by-id';

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

    try {
        response.render("deck", { deckid: deckid, deckname: deck.name, loggedin: request.user ? true : false });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}