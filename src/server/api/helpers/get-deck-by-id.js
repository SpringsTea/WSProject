'use strict';

import Deck from '../models/deck'

module.exports = async (deckid, { populate = false, lean = false, user }) => {
    try {
        let deck = Deck.findOne(
            {deckid: deckid, deleted: false}, 
            '-_id cards datemodified deckid description name userid valid sets neo_fail views attributes favoritecount favoriteusers myfavorite private',
            { lean: lean }
        )

        if( populate === true ){
            deck.populate('cards').populate('sets')
            .populate('userid', 'name')
        }

        await deck.exec();
        return deck;

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Deck was not found'
        };
    }
}