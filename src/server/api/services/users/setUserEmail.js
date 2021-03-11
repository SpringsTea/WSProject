'use strict';

/** 
 * @module setUserEmail
 */

import User from '../../models/user'

/**
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (request, response, next) => {
    const data = request.body;
    const requser = request.user;

    let user = await User.findOne(
        {_id: requser._id}, 
        'email'
    )

    if(!data.email){
        response.status(500).json({success: false, message: 'No email was given'})
    }
    else if(!!user){

        //Check that the given email is not already in use
        let checkuser = await User.findOne(
            {email: data.email.toLowerCase()}, 'email'
        )
        
        if(!!checkuser){
            response.status(500).json({success: false, message: 'This email is already in use'})
            return false;
        }

        user.email = data.email.toLowerCase()

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