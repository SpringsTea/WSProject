const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./api/models/user');

module.exports = (passport) => {
    passport.use(
        new localStrategy(
            (email, password, done) => {
                try{
                    User.findOne({ email: new RegExp(email, "i") }).then(user => {
                        if(!user) {
                            return done(null, false);
                        }
                            
                        //compare hash
                        bcrypt.compare(password, user.password, (err, match) => {
                            if(match) {
                                return done(null, user);
                            }
                            return done(null, false);
                        })
                    })
                }catch (error) {
                    console.log(error);
                    return done(null,false);
                }
            }
        )
    );
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err,user);
        })
    })

}