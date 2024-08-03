'use strict';

import Card from '../models/card'

import { DECKLOG_EN, DECKLOG_JP } from '../../config/Bushiroad';
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
        let lang = request.query.lang || 'EN';

        if( DecklogID ){

            const deckdata = await GetDecklog(DecklogID, lang);

            if( !deckdata.id ){
                response.status(500).json({
                    success: false,
                    message: 'Decklog not found'
                })
                return false;
            }

            const decktitle = deckdata.title || 'New Deck';
            let carderrors = [];

            //Get the encore card object for each card in the deck data by it's card code
            let cardpromises = deckdata.list.map((card) => {

                //remove extra rarities from the card code
                const cardcode = card?.card_number.replace(/-(\d+)([A-Z]*)$/, '-$1');

                return Card.findOne({cardcode}).select('-ability -attributes -name -__v').exec()
                .then((res) => {
                    if(res){//will be null if not found
                        return Array(card.num).fill(res)
                    }
                    else{
                        carderrors.push(cardcode);
                        return false;
                    }
                })
            })

            let cardlist = await Promise.all(cardpromises)
            //remove false entries from the list (cards that wern't found)
            cardlist = cardlist.filter((c) => c !== false).flat();

            response.status(200).json({
                name: decktitle,
                cards: cardlist,
                source: lang === 'EN' ? DECKLOG_EN : DECKLOG_JP,
                carderrors,
            });
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