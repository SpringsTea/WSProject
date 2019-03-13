'use strict';

/** 
 * @module Login
 */

const passport = require('passport');

/**
 * Authenticate user login credentials by executing prescribed username password Passport strategy.
 * Accepts x-www-form-urlencoded form data.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (req, res, next) => {
    passport.authenticate('local')(req, res, next);
}; 