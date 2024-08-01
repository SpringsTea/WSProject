'use strict';

import GetDecklog from '../helpers/get-decklog';

/**
 * Import Decklog
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {

    try {
        let DecklogID = request.params.decklogid;

        if( DecklogID ){

            const deckdata = await GetDecklog(DecklogID);
            response.status(200).json(deckdata);
        }
        else{
            response.status(500).json({
                success: false,
                message: 'No DecklogID provided'
            })
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}