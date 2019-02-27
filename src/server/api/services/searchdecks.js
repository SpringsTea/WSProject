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
module.exports = async ({query:params}, response, next) => {
    try {
        const limit = 30;
        let query = {
            valid: params.invalid !== undefined ? false : true //valid decks only be default
        }

        const options = {
            select: '-_id cards datemodified datecreated deckid description name userid valid neo_sets',
            sort: { datecreated: -1 },
            page: params.page || 1,
            limit: limit,
            populate: {
                path: 'cards',
                options: {
                    limit: 1
                }
            },
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

        if( params.text ){
            const regex = new RegExp(params.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
            query.name = regex;
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