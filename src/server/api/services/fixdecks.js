'use strict';

//Temp operation to fix decks when structure changes
//TODO remove this route

import Deck from '../models/deck'
import Card from '../models/card'
import DeckValidator from '../helpers/deck-validator'
import DeckSets from '../helpers/deck-sets';
import DeckLanguage from '../helpers/deck-language';

/**
 * Get Series Cards
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {

        const Decks = await Deck.find({ 
            valid: true,
            datecreated: { $lt: new Date(2019, 5, 1) }
        }).exec();

        console.log(Decks.length);

        for (let deck of Decks) {
            const cardData = await Card.find({ 
                '_id' : deck.cards
            }).exec();

            let deckLegality = DeckValidator(deck, cardData);
            deck.valid = deckLegality.deckvalid;
            deck.neo_sets = deckLegality.neoSets;
            deck.neo_fail = deckLegality.failReason;
            //Get a list of all set ids that are present in the deck
            deck.sets = await DeckSets(deck, cardData);
            //Get deck language
            deck.lang = DeckLanguage(cardData);

            deck.save();
        }

        response.status(200).send({ message: 'Decks have been fixed' });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}