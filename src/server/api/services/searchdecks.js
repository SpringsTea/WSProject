'use strict';

/** 
 * @module SearchDeck
 */

import Deck from '../models/deck'

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
            valid: params.invalid !== undefined ? false : true //valid decks only be default
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

        if( params.userid ){
            if( params.userid === 'true' ){
                query.userid = user._id;
            }
            else{
                query.userid = params.user;
            }
        }

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