'use strict';

/** 
 * @module SearchDeck
 */

import Deck from '../models/deck'
import User from '../models/user'
import {decode} from 'html-entities';

const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

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
            deleted: 0,
            private: 0
        }

        const options = {
            select: '-_id cards datemodified datecreated deckid description name userid valid sets attributes favoriteusers favoritecount myfavorite',
            sort: { datecreated: -1 },
            page: params.page || 1,
            limit: limit,
            populate: [
                {
                    path: 'cards',
                    limit: 20
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

        if( params.neoset ){
            query.neo_sets = ObjectId(params.neoset);
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
                let finduser = await User.findOne({name: decode(params.username)});
                if( finduser ){
                    query.userid = finduser._id;
                }
            }

            //if the logged in user is querying their own decks, return private decks
            if(user._id.equals( ObjectId(query.userid) )){
                delete query.private
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

        if( params.favorites ){
            query.favoriteusers = query.userid ? query.userid : user._id;
            delete query.userid;//requesting favorites will any deck a user has favorited, ie ones they didnt make
        }

        if( params.attributes ){
            query['attributes.name'] = Array.isArray(params.attributes) ? { $all: params.attributes} : params.attributes;
        }

        if( params.cards ){
            query['cards'] =  { $all: params.cards };
        }        

        await Deck.paginate(query, options, (err, result) => {
            if (err) throw "Pagination Error"

            let decks = Object.assign([],result.decks);
            decks.forEach(function(deck, i){
                if(user && deck.favoriteusers.includes(user._id)){
                    deck.myfavorite = true;
                }
                deck.favoriteusers = undefined;//Dont ever want to give this to the user
            })                

            response.status(200).json({...result, decks: decks, pagelimit:limit})
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}