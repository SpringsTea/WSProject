'use strict';

/** 
 * @module VerifyEmail
 */

const User = require('../models/user');

/**
 * Activate user account.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */

module.exports = (req, res) => {
    User.findOne({activeToken: req.params.token})
        .then((user) => {
            if(!user) {
                return res.status(401).json({message: 'Activation token invalid.'});
            }
            
            user.active = true;
            user.activeToken = null;

            user.save()
              .then(() => {
                  res.status(200).json({
                      message: 'Account activated'
                  });
            })
        })
}