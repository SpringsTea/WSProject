'use strict';

/** 
 * @module GetTranslations
 */

import Translations from '../../models/translations'
const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId;

/**
 * Get Series Translations
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    const seriesid = request.params.seriesid;
    const user = request.user;
    try {
        let translations = await Translations.findOne({seriesid: ObjectId(seriesid)}).select('attributes moddate translations').exec();
        response.status(200).json({ success: true, data:translations});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}