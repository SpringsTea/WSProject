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
                res.redirect('/NotFound')
            }
            
            userQuery.verify = true;
            userQuery.verifyToken = null;

            userQuery.save()
              .then(() => {
                res.redirect('/login')
            })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: 'something went wrong'
        }) 
    }   
}