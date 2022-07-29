'use strict';

/** 
 * @module SearchDeck
 */

import Card from '../models/card'

const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;
const quoteexperession = new RegExp(/(["'])(?:(?=(\\?))\2.)*?\1/)
const cardtypes = ['CX', 'CH', 'EV'];
const cardcolours = [ "YELLOW", "GREEN", "RED", "BLUE", "PURPLE" ];

/**
 * Search deck given various parameters
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async ({params, user = {}}, response, next) => {
    try {
        const limit = 10;
        const lang = user.preferedlocale || 'EN'; 

        let searchtext = params.query;
        let searchextras = {
            power: undefined,
            side: undefined,
            release: undefined,
            level: undefined,
            cost: undefined,
            colour: undefined,
            cardtype: undefined,
        }

        const hasquote = quoteexperession.exec(params.query)

        if(!!hasquote){
            let extras = searchtext.replace(hasquote[0], "").trim().split(' ')//retreave all text not inside the first matched quotes eg. ['blue', 'CX']
            searchtext = hasquote[0].replace(/("|')/g, "")//store text in quotes, this will be either the name or ability search

            extras.map((val) => {
                if(cardtypes.includes(val.toUpperCase())){
                    searchextras.cardtype = val.toUpperCase();
                }
                if(cardcolours.includes(val.toUpperCase())){
                    searchextras.colour = val.toUpperCase();
                }
                if(val.match(/[0-9]\/[0-9]/)){// eg 1/0 represents level/cost. can test with %2F as the slash in url
                    searchextras.level = val[0]
                    searchextras.cost = val[2]
                }
                if(val.toUpperCase().match(/[S,W][0-9]+/)){ // eg S67, W87
                    searchextras.side = val[0].toUpperCase()
                    searchextras.release = val.substring(1)
                }
                if( Number.isInteger(Number(val)) && parseInt(val) >= 500 ){ //assume a number 500 or higher is the power
                    searchextras.power = val
                }
            })
        }   

        //Delete undefined values to mongoose dosn't try to find them
        Object.keys(searchextras).forEach(key => searchextras[key] === undefined ? delete searchextras[key] : {});

        console.log(searchextras)

        let query = {
            ...searchextras,
            $or: [
                { [`locale.${lang}.name`]: { "$regex": searchtext, "$options": "i" } },
                { [`locale.${lang}.ability`]: { "$regex": searchtext, "$options": "i" } },
            ]            
        }

        let cards = await Card.find(query).select(`_id locale.${lang}.name imagepath`).limit(limit).exec();             

        response.status(200).json(cards)
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}