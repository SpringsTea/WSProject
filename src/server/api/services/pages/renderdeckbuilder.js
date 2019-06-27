'use strict';
import GetDeckById from '../../helpers/get-deck-by-id';

/** 
 * @module RenderDeckBuilder
 */

/**
 * Render Deck Builder
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        let deckid = request.params.deckid;

        if(deckid){
            let deck = await GetDeckById(deckid, {
                populate: false,
                view: false
            });
        }    

        response.render("builder", { 
        	loggedin: request.user ? true : false, 
        	mode: request.params.mode, 
        	deckid: request.params.deckid
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}