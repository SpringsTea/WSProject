'use-strict';

/** 
 * @module Auth
 */

const passport = require('passport');

/**
 * Authenticate user resource access via JWT by executing prescribed JWT Passport strategy
 * Looks for bearer token in authorization header.
 * 
 * @param {String} strategy 
 * @param {Anonymous Object} options
 */

module.exports = (req,res,next) => {
    if(req.user) {
        return next();
    }else {
        return res.status(401).json({
            message: 'User authentication failed'
        })
    }

};