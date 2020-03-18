// IMPORT libraries
const express = require('express');         // routing
const router = express.Router();            // import only router portion from express library
const gravatar = require('gravatar');       // creating avatar
const bcrypt = require('bcryptjs');         // encrypting password
const jwt = require('jsonwebtoken');        // creating json web token
const keys = require('../../config/keys');  // key is needed for creating jwt
const User = require('../../models/User');  // User model

// VALIDATORS
const validateRegisterInput = require('../../validations/register');  
const validateLoginInput = require('../../validations/login');


// @route     POST api/users/register
// @desc      REGISTER new user 
// @access    Public
router.post('/register', (req, res) => {

  // validate required fields
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // passed validation
  User.findOne({ email: req.body.email})
  .then(user => {
    if (user) {
      // user already exists in MongoDB
      return res.status(400).json({ email: 'Email already exist!'})
    } else {
      // create the new user in MongoDB

      // create avatar
      const avatar = gravatar.url(req.body.email, 
        {
          s: '200',   // size
          r: 'pg',    // appropriate file
          d: 'retro'  // defalut avatar image
        }, true       // secured url
      );

      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,  // plain password, needs to be hashed 
          avatar
      });

      // auto-generated salt and hash
      bcrypt.hash(newUser.password, 10)
      .then(hash => {
        newUser.password = hash;
        newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
      })
    }
  })
  .catch(() => res.status(404).json({ email: 'Email not found' }));
});

// @route     POST api/user/login
// @desc      LOGIN user 
// @access    Public
router.post('/login', (req, res) => {

  // validate required fields
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // passed validation
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(404).json({ email: 'User not found' })
    } else {
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // let's create a TOKEN that will be attached to every request going forward
          // payload: extract piece of your information in order to create a token
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          // create a token, required payload & key
          jwt.sign(
            payload,
            keys.secretOrKey,
            {expiresIn: 1800},
            (err, encoded) => {
              if (err) {
                return res.json(err);
              }
              res.json({
                sucess: true,
                token: 'Bearer ' + encoded
              })
            });
        } else {
          return res.status(400).json({ password: 'Incorrect password!' });
        }
      }) 
      .catch(() => res.status(400).json({ password: 'Incorrect password!' }));
    }
  })
  .catch(() => res.status(404).json({ email: 'Email not found!' }));
});

// export router 
module.exports = router;