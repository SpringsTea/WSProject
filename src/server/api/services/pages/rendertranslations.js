'use strict';

/** 
 * @module RenderTranslations
 */

/**
 * Render Translation Builder
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        response.render("translations", {loggedin: request.user ? true : false});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}