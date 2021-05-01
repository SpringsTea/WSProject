'use strict';

/** 
 * @module RenderPageNotFound
 */

/**
 * Render 404 page
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
    	const user = request.user ? request.user._doc : false;
    	const roles = user ? user.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys
        response.render("pagenotfound", {loggedin: user ? true : false, ...user, username: user.name, roles});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}