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
        let deckLegality = await DeckValidator(deckdata, cardData);
        deckdata.valid = deckLegality.deckvalid;
        deckdata.neo_sets = deckLegality.neoSets;
        deckdata.neo_fail = deckLegality.failReason;
        //Get a list of all set ids that are present in the deck
        deckdata.sets = await DeckSets(deckdata, cardData);
        //Get deck language
        deckdata.lang = DeckLanguage(cardData);

        deckdata.attributes = [];
        deckdata['attribute-group'].map( (attrname) => {
            let attribute = { name: attrname };
            if( attrname === 'Tournament' ){
                attribute.record = { wins: deckdata['record-wins'] || 0, losses: deckdata['record-losses'] || 0 }
            }
            deckdata.attributes.push(attribute);
        })

        //Edit existing deck
        if(deckdata.deckid){
            let user = request.user;

            if( !user ){
                response.status(500).send({ success: false, message: 'User not logged in' });
                return false;
            }

            let result = await Deck.updateOne({deckid: deckdata.deckid, userid: user._id}, {...deckdata, datemodified: new Date()});
            
            if( result.n  === 0 ){
                response.status(500).send({ success: false, message: 'Deck not found' });
            }
            else{
                response.status(200).send({ deck: deckdata });
            }           
            
        }
        // create deck 
        else{
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