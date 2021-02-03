'use strict';

/** 
 * @module GetSeriesList
 */

import User from '../../models/user'

/**
 * Get Single user data
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {

    let query = {
        
    };
    if(request.params.userid){
        query._id = request.params.userid;
    }

    try {
        let user = await User.findOne(query)
        .exec();
        const iscurrentuser = request.user._id.equals(user._id);
        let payload = {
            id: user._id,
            username: user.name,
            roles: user.roles,
            config: user.config,
            currentuser: iscurrentuser,
            regdate: user.regdate,
        }

        if(iscurrentuser === true){
            payload.email = user.email;
        }

        response.status(200).json(payload);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}