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
        const deckid = request.params.deckid;
        const user = request.user ? request.user._doc : false;
        const roles = user ? user.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys

        if(deckid){
            let deck = await GetDeckById(deckid, {
                populate: false,
                view: false
            });
        }    

        response.render("builder", { 
        	loggedin: user ? true : false, 
        	mode: request.params.mode, 
        	deckid: request.params.deckid,
            ...user,
            username: user.name,
            roles
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}