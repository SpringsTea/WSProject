'use strict';
import User from '../../models/user'

/** 
 * @module RenderUser
 */

/**
 * Render user page
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    try {
        const requser = request.user ? request.user._doc : false;
        const roles = requser ? requser.roles.reduce((a,b)=> (a[b]=true,a),{}) : {};//reduce roles to array keys
        const theme = user ? user.config.theme : 'light'
        let user = null;

        if( request.params.username ){
            user = await User.findOne({name: request.params.username});

            if( !user ){
                response.redirect('/UserNotFound');
                return false;
            }
            
        }
        else if(  request.user ){
            response.redirect(`/user/${request.user.name}`);
            return false;
        }
    	else{
    		response.redirect('/login');
            return false;
    	}
        response.render("user", {loggedin: requser ? true : false, username: user.name, userid: user._id, theme: theme, roles});
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}