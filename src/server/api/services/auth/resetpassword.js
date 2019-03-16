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

module.exports = async (req, res) => {
    if (!emailRegex.test(req.body.email)) {
        return res.error(422).json({ success: false, message: 'Please enter a valid email'});
    }else {
        try {
            let userQuery = await User.findOne({email: req.body.email});
            if(!userQuery) {
                return res.status(400).json({ success: false, message: 'Email was not found'});
            }else {
                //generate token
                const token = crypto.randomBytes(20).toString('hex');
                
                //token expires in 1hr
                userQuery.resetToken = token;
                userQuery.tokenExpires = Date.now() + 3600000;

                userQuery.save();

                const transporter = nodemailer.createTransport({
                    service: process.env.SERVICE,
                    auth: {
                        user: process.env.MAILER,
                        pass: process.env.MAIL_PW
                    }
                })

                const resetTemplate = {
                    to: userQuery.email,
                    from: process.env.MAILER,
                    subject: 'Reset Password',
                    text: 
                        'Click the link below to reset password: \n\n' +
                        `${process.env.SITE}/api/reset/${token}` + '\n\n'
                }

                transporter.sendMail(resetTemplate, (err) => {
                    if(err) {
                       throw err;
                    }else {
                        return res.status(200).json({ success: true, message: 'email sent'});
                    };
                })
            }  
        } catch (error) {
            console.log(error);
            response.status(500).json({
              success: false,
              message: 'something went wrong'
            })
        }
    }
}