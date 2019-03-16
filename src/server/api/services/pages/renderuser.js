'use strict';

/** 
 * @module RenderLogin
 */

/**
 * Render login page
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {

    	if(!request.user){
    		response.redirect('/login')
    	}

        response.render("user", {loggedin: request.user ? true : false, userid: request.user._id, username: request.user.name});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}