'use strict';

/**
 * @module SaveDeck
 */

import Deck from '../models/deck';
import Card from '../models/card';
import DeckValidator from '../helpers/deck-validator';

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
    const deckdata = {
      ...d,
      userid: null,
    };

    const cardData = await Card.find({
      '_id': deckdata.cards,
    }).exec();

    // determine neo standard legality
    const deckLegality = new DeckValidator({...deckdata, carddata: cardData});
    deckdata.valid = deckLegality.deckvalid;
    deckdata.neo_sets = deckLegality.neoSets;
    deckdata.neo_fail = deckLegality.failReason;

    // create deck
    const createdDeck = await Deck.create(deckdata);
    response.status(200).send({deck: createdDeck});
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: error,
      message: 'something went wrong',
    });
  }
};
