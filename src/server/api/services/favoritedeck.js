'use strict';

import Deck from '../models/deck'

/** 
 * @module FavoriteDeck
 */

/**
 * Favorite Deck
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports =  async (request, response, next) => {
    const deckid = request.params.deckid;
    const user = request.user;

    let deck = await Deck.findOne(
        {deckid: deckid, deleted: false}, 
        'userid favoriteusers favoritecount'
    )

    if(user && deck.error !== true){

        if( !deck.favoriteusers.includes(user._id) ){
            deck.favoriteusers.push(user._id);
            deck.favoritecount += 1;
        }
        else{
            deck.favoriteusers = deck.favoriteusers.filter( (u) => !u.equals(user._id) )
            deck.favoritecount -= 1;
        }        

        deck.save( (err) => {
            if(err){
                response.status(500).json(err)
            }
            else{
                response.status(200).json({success: true, favoritecount: deck.favoritecount})
            }
        });
        
    }
    else{
        response.status(500).json(deck); 
    }
}