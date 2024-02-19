'use-strict';

/** 
 * @module RegisterUser
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../../models/user');

/**
 * Create new user provided email and username are not already registered.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */


module.exports = async (req, res) => {
    
    let username = req.body.username, email = req.body.email, password = req.body.password;
    try {
        let emailQuery = await User.find({email: new RegExp(email, "i")});
        if (emailQuery.length >=1) {
            return res.status(422).json({
                success: false,
                message: 'Error: That email is already in use'
            })
        }
        let usernameQuery = await User.find({name: new RegExp(username, "i")});
        if (usernameQuery.length >= 1) {
            return res.status(422).json({
                success: false,
                message: 'Error: that username is taken'
            })
        }

        bcrypt.hash(password, 10, (err, pwHash) => {
            const token = crypto.randomBytes(20).toString('hex');

            const user = new User ({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                name: username,
                password: pwHash,
                verify: false,
                verifyToken: token,
                regdate: Date.now()
            });

            user.save();
            const transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAILER,
                    clientId: process.env.MAIL_CLIENTID,
                    clientSecret: process.env.MAIL_OAUTHSECRET,
                    refreshToken: process.env.MAIL_REFRESHTOKEN,
                }
            })  
            
            const verifyTemplate = {
                to: user.email,
                from: process.env.MAILER,
                subject: 'Email Verification',
                text: 
                    'Click the link below to verify your email address: \n\n' +
                    `${process.env.SITE}/api/verify/` + token + '\n\n'
            }
    
            transporter.sendMail(verifyTemplate);
    
            res.status(200).json({
                success: true,
                message: 'Success: Your account has been registered, please check you email.'
            }) 
                
        });  
    } catch (error) {
        console.log(error);
        response.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}