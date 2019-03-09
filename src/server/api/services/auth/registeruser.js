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


module.exports = (req, res) => {
    
    let username = req.body.username, email = req.body.email, password = req.body.password;

    User.find({email: email})
        .then(emailQueryResult => {
            if(emailQueryResult.length >= 1) {
                return res.status(422).json({
                    message: 'Error: That email is already in use!'
                });
            } else {
                User.find({ name: username })
                    .then(userQueryResult => {
                        if(userQueryResult.length >= 1) {
                            return res.status(422).json({
                                message: 'Error: That username is taken!'
                            });
                        } else {
                            bcrypt.hash(password, 10, (err, pwHash) => {
                                if (err){
                                    return res.status(500).json({
                                        error: err
                                    });
                                } else {
                                    const token = crypto.randomBytes(20).toString('hex');

                                    const user = new User ({
                                        _id: new mongoose.Types.ObjectId(),
                                        email: email,
                                        name: username,
                                        password: pwHash,
                                        verify: false,
                                        verifyToken: token
                                    });
                                    user
                                    .save()
                                    .then(() => {
                                        const transporter = nodemailer.createTransport({
                                            service: process.env.SERVICE,
                                            auth: {
                                                user: process.env.MAILER,
                                                pass: process.env.MAIL_PW
                                            }
                                        })
                        
                                        const verifyTemplate = {
                                            to: user.email,
                                            from: process.env.MAILER,
                                            subject: 'Email Verification',
                                            text: 
                                                'Click the link below to verify your email address: \n\n' +
                                                `${process.env.SITE}/api/verify/${token}` + '\n\n'
                                        }
                        
                                        transporter.sendMail(verifyTemplate, (err) => {
                                            if(err) {
                                                res.status(500).json({
                                                    error: err
                                                })
                                            }
                                        })

                                        res.status(201).json({
                                            message: 'Success: Your account has been registered, please check you email.'
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err
                                        });
                                    });    
                                }
                            })
                        }
                    })
                }
        })
}
