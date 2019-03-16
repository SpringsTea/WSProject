'use strict';

/** 
 * @module SearchDeck
 */

import Deck from '../models/deck'
import User from '../models/user'

/**
 * Search deck given various parameters
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async ({query:params, user}, response, next) => {
    try {
        const limit = 24;
        let query = {
        }

        const options = {
            select: '-_id cards datemodified datecreated deckid description name userid valid sets',
            sort: { datecreated: -1 },
            page: params.page || 1,
            limit: limit,
            populate: [
                {
                    path: 'cards',
                    options: {
                        limit: 1
                    }
                },
                {
                    path: 'userid',
                    options: {
                        select: 'name'
                    }
                }
            ],
            customLabels: {
                docs: 'decks',
                totalDocs: 'totalDecks',
                page: 'page',
                totalPages: 'totalPages'
            }
        }

        if( params.invalid === undefined ){//valid decks only be default
            query.valid = true;
        }

        //Filter by one set
        if( params.set ){
            query.sets = params.set;
        }

        if( params.lang ){
            query.lang = params.lang;
        }

        if( params.text ){
            const regex = new RegExp(params.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
            query.name = regex;
        }

        if( params.username ){
            if( params.username === 'true' ){
                query.userid = user._id;
            }
            else{
                let user = await User.findOne({name: params.username});
                if( user ){
                    query.userid = user._id;
                }
            }
        }

        if( params.userid ){
            if( params.userid === 'true' ){
                query.userid = user._id;
            }
            else{
                query.userid = params.user;
            }
        }

        console.log(query);

        await Deck.paginate(query, options, (err, result) => {
            if (err) throw "Pagination Error"

            response.status(200).json({...result, pagelimit:limit})
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}