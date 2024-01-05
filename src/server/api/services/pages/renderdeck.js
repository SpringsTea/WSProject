'use strict';

import GetDeckById from '../../helpers/get-deck-by-id';
import Deck from '../../models/deck'

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
    let deck = await GetDeckById(deckid, {
        populate: false
    });
    const user = request.user ? request.user._doc : false;
    const roles = user ? user.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys

    try {

        if(deck){
            response.render("deck", { 
                deckid: deckid, 
                deckname: deck.name, 
                userid: request.user ? request.user._id : null, 
                loggedin: user ? true : false,
                ...user,
                username: user.name,
                theme: user.config.theme,
                roles
            });

            if( !request.user || deck.userid != request.user._id ){
                Deck.findOne({deckid: deckid}, function (err, doc) {
                  doc.views = deck.views + 1;
                  doc.save();
                });
            }
        }
        else{
            response.redirect('/DeckNotFound');
        }
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}