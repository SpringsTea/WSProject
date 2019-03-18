'use-strict';

/** 
 * @module SetNewPassword
 */

const bcrypt = require('bcrypt');

const User = require('../../models/user');

/**
 * Change user's password provided token matches and is still valid.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */

module.exports = async (req, res) => {
    try {
        let user = await User.findOne({resetToken: req.params.token, tokenExpires: {$gt: Date.now() } });
        if(!user) {
            return res.status(401).json({success: false, message: 'Token expired, please request a new reset password link.'});
        }
        //hash new password
        bcrypt.hash(req.body.password, 10, (err, pwHash) => {
            if (err){
                throw err;
            } else { 
                user.password = pwHash;
                user.resetToken = null;
                user.tokenExpires = null;

                //save changes
                user.save();

                res.status(200).json({
                    success: true,
                    message: 'Password updated!',
                });
                   
            }
        });
    } catch (error) {
        console.log(error);
            response.status(500).json({
                success: false,
                message: 'something went wrong'
            }) 
    }        
}