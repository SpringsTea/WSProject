'use-strict';

/** 
 * @module SetNewPassword
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

/**
 * Change user's password provided token matches and is still valid.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */

module.exports = async (req, res) => {
    try {
        let userQuery = await User.findOne({resetToken: req.params.token, tokenExpires: {$gt: Date.now() } });
        if(!userQuery) {
            return res.status(401).json({message: 'Token expired, please request a new reset password link.'});
        }
        //hash new password
        bcrypt.hash(req.body.password, 10, (err, pwHash) => {
            if (err){
                throw err;
            } else { 
                user.password = pwHash;
                user.resetToken = null;
                user.tokenExpires = null;

                //save changes and login user
                user.save();
                
                const body = {_id : user._id, username : user.name};
                const token = jwt.sign({ user: body }, process.env.SECRET_KEY );
                res.status(200).json({
                    message: 'Password updated!',
                    token: token
                });
                   
            }
        });
    } catch (error) {
        console.log(error);
            response.status(500).json({
                error: error,
                message: 'something went wrong'
            }) 
    }        
}