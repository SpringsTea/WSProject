'use-strict';

/** 
 * @module PasswordReset
 */

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../../models/user');

let emailRegex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

/**
 * Generate token to flag account for password reset, and send email containing reset link.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 */

module.exports = (req, res) => {
    if (!emailRegex.test(req.body.email)) {
        return res.error(422).json({message: 'Please enter a valid email'});
    }else {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(400).json({message: 'Invalid username/password'});
            }else {
                //generate token
                const token = crypto.randomBytes(20).toString('hex');
                
                //token expires in 1hr
                user.resetToken = token;
                user.tokenExpires = Date.now() + 3600000;

                user.save();

                const transporter = nodemailer.createTransport({
                    service: process.env.SERVICE,
                    auth: {
                        user: process.env.MAILER,
                        pass: process.env.MAIL_PW
                    }
                })

                const resetTemplate = {
                    to: user.email,
                    from: process.env.MAILER,
                    subject: 'Reset Password',
                    text: 
                        'Click the link below to reset password: \n\n' +
                        `${process.env.SITE}/api/reset/${token}` + '\n\n'
                }

                transporter.sendMail(resetTemplate, (err) => {
                    if(err) {
                        res.status(500).json({
                            error: err
                        })
                    }else {
                        return res.status(200).json({message: 'email sent'});
                    };
                })
            }
            
        })
    }
}