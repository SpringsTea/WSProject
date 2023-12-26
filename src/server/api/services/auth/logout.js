'use strict';

/** 
 * @module Logout
/**
 * End session and logout user.
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */
module.exports = async (req, res, next) => {
    if (req.user){
        //Should be req.logout() but it's not working
        req.session.destroy((err) => {
            if(err){
                res.status(500).json({
                    message:'Something went wrong',
                    err: err
                }) 
            }
            else{
                res.status(200).json({
                    message:'Logged out successfully'
                })
            }
        });
        
    }else {
        res.status(500).json({
            message: 'Not logged in'
        })
    }
}