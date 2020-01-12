'use strict';
var pdfFillForm = require('pdf-fill-form');

import GetDeckById from '../helpers/get-deck-by-id'
import Forms from '../../config/forms';
/** 
 * @module GetDecKForm
 */

/**
 * Generates a PDF Filled entry form
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */

const filterCardQuantity = (cards) =>{
    return cards.reduce( (a,b) => {
        var i = a.findIndex( x => x._id === b._id);
        return i === -1 ? a.push({ ...b, quantity : 1 }) : a[i].quantity++, a;
    }, []);
}

module.exports = async (req, res, next) => {
    const Form = req.params.formtype ? Forms[req.params.formtype] : Forms.BSNA;
    if(!Form){
        res.status(500).json({
            success: false,
            message: 'Form Type incorrect'
        });
        return false;
    }

    let Deck = await GetDeckById(req.params.deckid, {
        populate: true,
        view: false,
        lean: true
    });

    if(!Deck){
        res.status(500).json({
            success: false,
            message: 'Deck was not found'
        });
        return false;
    }
    let DeckName = Deck.name;
    let Cards = filterCardQuantity(Deck.cards).sort( (a,b) => {//sort by sid
        if(a.level < b.level) { return -1; }
        if(a.level > b.level) { return 1; }
        return 0;
    })

    let FillData = {
        DeckName
    }

    let CharCards = Cards.filter( (card) => card.cardtype === 'CH' )
    .map( (card, i) => {

        const locale = card.locale[Form.lang].name ? Form.lang : 'NP';

        FillData = {
            ...FillData,
            [`CHCard${i+1}Q`]: card.quantity,
            //TODO change this to static card code when available
            [`CHCard${i+1}Code`]: `${card.set}/${card.side}${card.release}${ card.side && card.release ? '-' : '' }${card.sid} ${card.rarity}`,
            [`CHCard${i+1}Level`]: card.level,
            [`CHCard${i+1}Name`]: card.locale[locale].name,
        }
    })
    let EventCards = Cards.filter( (card) => card.cardtype === 'EV' )
    .map( (card, i) => {
        const locale = card.locale[Form.lang].name ? Form.lang : 'NP';

        FillData = {
            ...FillData,
            [`EVCard${i+1}Q`]: card.quantity,
            //TODO change this to static card code when available
            [`EVCard${i+1}Code`]: `${card.set}/${card.side}${card.release}${ card.side && card.release ? '-' : '' }${card.sid} ${card.rarity}`,
            [`EVCard${i+1}Level`]: card.level,
            [`EVCard${i+1}Name`]: card.locale[locale].name,
        }
    })
    let CXCards = Cards.filter( (card) => card.cardtype === 'CX' )
    .map( (card, i) => {
        const locale = card.locale[Form.lang].name ? Form.lang : 'NP';
        FillData = {
            ...FillData,
            [`CXCard${i+1}Q`]: card.quantity,
            //TODO change this to static card code when available
            [`CXCard${i+1}Code`]: `${card.set}/${card.side}${card.release}${ card.side && card.release ? '-' : '' }${card.sid} ${card.rarity}`,
            [`CXCard${i+1}Name`]: card.locale[locale].name,
        }
    })

    try {
        var pdf = pdfFillForm.writeSync(Form.path, 
            FillData, { "save": "pdf" } );
        res.type("application/pdf");
        res.send(pdf);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}