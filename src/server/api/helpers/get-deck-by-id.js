'use strict';

import Deck from '../models/deck'

module.exports = async (deckid, populate = true) => {
    try {
        let deck = Deck.findOne(
            {deckid: deckid}, 
            '-_id cards datemodified deckid description name userid valid sets neo_fail'
        )

        if( populate === true ){
            deck.populate('cards').populate('sets')
            .populate('userid', 'name')
        }

        await deck.exec();

        return deck;
    } catch (error) {
        return {
            error: true,
            message: 'Deck was not found'
        };
    }
}