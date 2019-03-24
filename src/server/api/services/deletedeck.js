'use strict';

/** 
 * @module Delete Deck
 */

import Deck from '../models/deck'

/**
 * Delete a deck (but not really)
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */

module.exports =  async (request, response, next) => {
    let deckid = request.params.deckid;
    let user = request.user;

    if(!user){
    	response.status(401).send({success: false, message: "User not authenticated"})
    	return false;
    }
    
    let deck = await Deck.findOne({deckid: deckid, userid: user._id}).exec();

    if(!deck){
    	response.status(401).send({success: false, message: "Deck not found"});
    	return false;
    }

    deck.deleted = true;
    deck.save();

    response.status(200).send({success: true, message: `Deck has been deleted`});
}