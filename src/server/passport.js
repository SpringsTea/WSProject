const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('./api/models/user');

module.exports = (passport) => {
    passport.use(
        new localStrategy(
            (email, password, done) => {
                User.findOne({ 
                  email: email 
                  }).then(user => {
                      if(!user) {
                        return done(null, false);
                      }
                      
                      //compare hash
                      bcrypt.compare(password, user.password, (err, match) => {
                        if(match) {
                            return done(null, user);
                        }else {
                            return done(null, false);
                        }
                      })
                  });
            }
        )
    );

    passport.use(new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey: process.env.SECRET_KEY
        },
        (jwt_payload, done) => {
            try{
              return done(null, jwt_payload);
            }catch(err) {
                done(error);
            }
        }
    ));
}