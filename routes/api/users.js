// IMPORT libraries
const express = require('express');
// import only router portion from express library
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

// @route     POST api/users/register
// @desc      REGISTER new user 
// @access    Public

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email})
  .then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist!'})
    } else {
      // create the new user in MongoDB
      const avatar = gravatar.url(req.body.email,
        {
          s: '200',
          r: 'pg',
          d: 'retro'
        });

      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
      });

      // hash the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => json(err))
        })
      })
    }
  })
  .catch(() => res.status(404).json({ email: 'Email not found' }));
})

// @route     POST api/user/login
// @desc      LOGIN user 
// @access    Public

router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' })
      } else {
        bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // piece of your information => payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            // create a token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 1800},
              (err, token) => {
                res.json({
                  sucess: true,
                  token: 'Bearer ' + token
                })
              });
          } else {
            return res.status(400).json({ email: 'Incorrect password!' })
          }
        }) 
      }
    })
    .catch(() => res.status(400).json({ email: 'Email not found!'}));
  }
);

// export router 
module.exports = router;