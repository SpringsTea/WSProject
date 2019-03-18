'use strict';

import Deck from '../models/deck'

module.exports = async (deckid) => {
    try {
        let docs = await Deck.find(
            {deckid: deckid}, 
            '-_id cards datemodified deckid description name userid valid sets neo_fail'
        ).limit(1).populate('cards').populate('sets')
        .populate('userid', 'name')
        .exec();
        if( docs.length > 0 ){
           return docs[0]
        } else {
            return null;
        }
    } catch (error) {
        return {
            error: true,
            message: 'Deck was not found'
        };
    }
}