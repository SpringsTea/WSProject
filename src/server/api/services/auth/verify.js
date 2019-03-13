'use strict';

/** 
 * @module VerifyEmail
 */

const User = require('../../models/user');

/**
 * Verify user account.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */

module.exports = async (req, res) => {
    try {
        let userQuery = await User.findOne({verifyToken: req.params.token});
            if(!userQuery) {
                return res.status(401).json({message: 'Verification token invalid.'});
            }
            
            userQuery.verify = true;
            userQuery.verifyToken = null;

            userQuery.save()
              .then(() => {
                  res.status(200).json({
                      message: 'Account verified'
                  });
            })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: 'something went wrong'
        }) 
    }   
}