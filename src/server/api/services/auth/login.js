'use strict';

/** 
 * @module Login
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Authenticate user login credentials by executing prescribed username password Passport strategy.
 * Accepts x-www-form-urlencoded form data.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) { return next(err); }

        if (!user) { 
            return res.status(401).json({message: 'Invalid username/password.'}); 
        }

        const body = {_id : user._id, email : user.email};
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY );

        return res.status(200).json({
            message: 'Login successful',
            token: token
        });
    })(req, res, next);
}; 