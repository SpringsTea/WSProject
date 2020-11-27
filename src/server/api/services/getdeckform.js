'use strict';
var pdfFillForm = require('pdf-fill-form');
const contentDisposition = require('content-disposition');

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
        if(a.type < b.type) { return -1; }
        if(a.type > b.type) { return 1; }
        return 0;
    })

    let FillData = {
        [Form.fields.DeckName]: DeckName
    }

    Form.cardtypes.map( (type) => {
        let TypeCards = Cards;

        if( type ){
            TypeCards = Cards.filter( (card) => card.cardtype === type)
        }

        TypeCards.map( (card, i) => {

            const locale = card.locale[Form.lang].name ? Form.lang : 'NP';
            const quantity = type ? Form.fields[type].Quantity(i) : Form.fields.Quantity(i);
            const code = type ? Form.fields[type].Code(i) : Form.fields.Code(i);
            const level = type ? Form.fields[type].Level(i) : Form.fields.Level(i);
            const name = type ? Form.fields[type].Name(i) : Form.fields.Name(i);

            //console.log(quantity, code, level, name)

            FillData = {
                ...FillData,
                [quantity]: card.quantity,
                //TODO change this to static card code when available
                [code]: `${card.set}/${card.side}${card.release}${ card.side && card.release ? '-' : '' }${card.sid} ${card.rarity}`,
                [level]: card.level,
                [name]: card.locale[locale].name,
            }
        })
    })

    try {
        var pdf = pdfFillForm.writeSync(Form.path, 
            FillData, { "save": "pdf" } );
        res.setHeader('Content-Disposition', 'attachment; filename=' + `${Deck.name}.pdf`);
        res.setHeader('Content-Disposition', 'attachment; filename=' + `${contentDisposition(DeckName)}.pdf`);
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