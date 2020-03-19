// Purpose:  validating token

// BEGIN Import libraries
//
// Use jwt version of passport
const JwtStrategy = require('passport-jwt').Strategy;   
// Extract token from authorization area and validate token
const ExtractJwt = require ('passport-jwt').ExtractJwt; 

const mongoose = require ('mongoose');    // Need User information from MongoDB
const User = mongoose.model('users');     // Same as User = require('../models/User');
const keys = require ('../config/keys');  // Need to decrypt token
//
// END Import libraries


// Package two options needed to extract token
// 1. Locate token at Authorization header as a bearer token
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// 2. SecretOrKey is need to decrypt token
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // jwt_payload will contain decyprted payload  
    
    // Validate user
    User.findById(jwt_payload.id)     // Locate User by ID inside the payload
      .then( user => {
        if (user) {
          return done(null, user);    // No error and pass user object
        }
        return done (null, false);    // Valid token but can't find the user
      })
      .catch(err => console.log(err));
  }))
}
