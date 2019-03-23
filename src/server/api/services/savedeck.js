'use strict';

/** 
 * @module SaveDeck
 */

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
        // parse request body
        const d = request.body;
        let deckdata = {
            ...d,
            userid: request.user ? request.user._id : null
        };

        const cardData = await Card.find({ 
            '_id' : deckdata.cards
        }).exec();

        //determine neo standard legality
        let deckLegality = DeckValidator(deckdata, cardData);
        deckdata.valid = deckLegality.deckvalid;
        deckdata.neo_sets = deckLegality.neoSets;
        deckdata.neo_fail = deckLegality.failReason;
        //Get a list of all set ids that are present in the deck
        deckdata.sets = await DeckSets(deckdata, cardData);
        //Get deck language
        deckdata.lang = DeckLanguage(cardData);

        //Edit existing deck
        if(deckdata.deckid){
            let existingdeck = await Deck.updateOne({deckid: deckdata.deckid}, deckdata);
            response.status(200).send({ deck: deckdata });
        }
        else{
            // create deck 
            let createdDeck = await Deck.create(deckdata); 
            response.status(200).send({ deck: createdDeck });
        }

        
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}