'use strict';

/**
 * @module SearchDeck
 */

import Deck from '../models/deck';

/**
 * Search deck given various parameters
 *
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
  const limit = parseInt(request.query.limit) || 10;

  try {
    const query = Deck.find(
        {},
        '-_id cards datemodified datecreated deckid description name userid valid neo_fail'
    ).limit(limit)
        .populate({
          path: 'cards',
          options: {
            limit: 1,
          },
        })
        .where('valid').equals(true)
        .sort('-datecreated');

    const docs = await query.exec();
    response.status(200).json(docs);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: true,
      message: 'Something went wrong',
    });
  }
};
