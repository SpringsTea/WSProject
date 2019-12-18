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
        const user = request.user ? request.user._doc : false;
        const roles = user ? user.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys
    	if( roles.translator ){
			response.render("translations", {loggedin: user ? true : false, ...user, roles});
    	}
    	else{
    		response.redirect("/");
    	}
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}