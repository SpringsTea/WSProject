'use strict';

/** 
 * @module getUserData
 */

import User from '../../models/user'
import Deck from '../../models/deck'

import GetDeckById from '../../helpers/get-deck-by-id'

/**
 * Get Single user data
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {

    let query = {
        
    };
    if(request.params.userid){
        query._id = request.params.userid;
    }

    try {
        let user = await User.findOne(query)
        .exec();

        let decks = await Deck.find({ userid: user._id, deleted: false }, '_id neo_sets deckid')
        .sort('-datecreated')
        .populate('neo_sets', 'name')
        .exec();

        let coverdeck = null;

        if(decks.length > 0){
            coverdeck = await GetDeckById(decks[0].deckid, {
                populate: true,
                view: false,
            });   
            if(request.user && coverdeck.favoriteusers.includes(request.user._id)){
                coverdeck.myfavorite = true;
            }
            coverdeck.favoriteusers = undefined;//Dont ever want to give this to the user
        }

        const iscurrentuser = request.user && request.user._id.equals(user._id);
        let payload = {
            id: user._id,
            username: user.name,
            roles: user.roles,
            config: user.config,
            currentuser: iscurrentuser,
            regdate: user.regdate,
            decks: decks,
            coverdeck: coverdeck
        }

        if(iscurrentuser === true){
            payload.email = user.email;
        }

        response.status(200).json(payload);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}