'use strict';

/**
 * @module RenderDeck
 */

/**
 * Render Deck
 *
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
  const deckId = request.params.deckid;
  try {
    response.render('deck', {deckid: deckId});
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: error,
      message: 'something went wrong',
    });
  }
};
