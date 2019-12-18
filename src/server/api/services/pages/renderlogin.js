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
    	const user = request.user ? request.user._doc : false;
    	const roles = user ? user.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys
        response.render("login", {loggedin: user ? true : false, tab: request.params.tab, token: request.params.token});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}