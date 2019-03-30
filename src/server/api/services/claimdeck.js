'use strict';

/** 
 * @module Claim Deck
 */

import Deck from '../models/deck'

/**
 * Claim a deck by a given user
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
    
    let deck = await Deck.findOne({deckid: deckid, userid: null}).exec();

    if(!deck){
    	response.status(401).send({success: false, message: "Deck not found"});
    	return false;
    }

    deck.userid = user._id;
    deck.save();

    response.status(200).send({success: true, message: `Deck has been claimed by ${user.name}`});
}