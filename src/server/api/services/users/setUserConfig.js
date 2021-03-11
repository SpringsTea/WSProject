'use strict';

/** 
 * @module setUserConfig
 */

import User from '../../models/user'

/**
 * Set key value pairs for user config data
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    const data = request.body;
    const requser = request.user;

    let user = await User.findOne(
        {_id: requser._id}, 
        'config'
    )

    if(!!user){
        user.config = {
            ...user.config,
            ...data
        }

        user.save( (err) => {
            if(err){
                response.status(500).json({success: false, message: err.message})
            }
            else{
                response.status(200).json({success: true, config:user.config })
            }
        });
    }
    else{
        response.status(500).json({success: false, message: 'User not found'})
    }

    
}