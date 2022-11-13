'use strict';

/** 
 * @module GetCard
 */

import Card from '../models/card'

const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

/**
 * Return a single card given a mongoid or a cardcode
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        let filters = request.query;
        let searchextras = {};


        if(!filters.cardcode && !filters.id){
            response.status(400).json({
                error: true, 
                message: 'Must pass id or cardcode'
            })
            return false;
        }


        if(filters.cardcode){
           searchextras.cardcode = filters.cardcode; 
        }

        if(filters.id){
            searchextras._id = filters.id;
        }


        let query = {
            ...searchextras,           
        }

        let card = await Card.findOne(query).select('-ability -attributes -name -__v').exec();             

        response.status(200).json(card || null)
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: true,
            message: 'Something went wrong'
        });
    }
}