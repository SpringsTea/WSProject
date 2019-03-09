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

module.exports = (req, res) => {
    User.findOne({verifyToken: req.params.token})
        .then((user) => {
            if(!user) {
                return res.status(401).json({message: 'Verification token invalid.'});
            }
            
            user.verify = true;
            user.verifyToken = null;

            user.save()
              .then(() => {
                  res.status(200).json({
                      message: 'Account verified'
                  });
            })
        })
}