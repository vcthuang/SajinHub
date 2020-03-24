// Pofile routing
//
// Profile managment:
// 1.  (Post Profile)     POST api/profile
// 2.  (Get Profile)      GET api/profile
// 3.  (Delete Profile)   DELETE api/profile
// 4.  (Get All)   GET api/profile/all
// 5.  GET api/profile/handle/:handle
// 6.  GET api/profile/user/:id
//
// Friends management:
// 7.  GET api/profile/friends
// 8.  POST api/profile/friends
// 9.  DELETE api/profile/friends/:id 
//
// Subscribers management:
// 10.  GET api/profile/Subscribers


// BEGIN Import libraries
//
const express = require ('express');        // Routing
const router = express.Router();
const mongoose = require('mongoose');       // Mongo DB
const passport = require('passport')        // token authentication

const User = require('../../models/User');  // User model
const Profile = require('../../models/Profile');  // User model
const validateProfileInput = require('../../validations/profile');  // Validation


// @route     POST api/profile
// @desc      Create or edit user profile
// @access    Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid} = validateProfileInput (req.body);
    if (!isValid)
      return res.status(400).json(errors);

    // Place user input in newProfile
    const newProfile = {};
    newProfile.user = req.user.id;    // Passport returns user
    if (req.body.handle) newProfile.handle = req.body.handle;
    if (req.body.bio) newProfile.bio = req.body.bio;
    if (req.body.website) newProfile.website = req.body.website;
    
    newProfile.location = {};         // Location is an object with city and country
    if (req.body.city) newProfile.location.city = req.body.city;
    if (req.body.country) newProfile.location.country = req.body.country;
    
    // Interest is an array, input is separated by comma
    if (typeof req.body.interests !== 'undefined') 
      newProfile.interests = req.body.interests.split(',');

    // READY to write to database
    Profile.findOne ({user: req.user.id})
      .then (profile =>{
        if (profile) {               // There is a profile for the user
          Profile.findOneAndUpdate (
            {user: req.user.id},     // Find the profile by ID
            {$set: newProfile},      // Values to be stored in the document 
            {new: true} 
          ).then(profile => res.json(profile));
        } else {                     // Create a new profile
          Profile.findOne({handle: newProfile.handle})  
            .then (profile => {
              if (profile) {         // handle has to be unqiue
                errors.handle = 'The handle already exists';
                return res.status(400).json (errors);
              }
              
              new Profile (newProfile) //Save to MongoDB
                .save ()
                .then (profile => res.json(profile));
            })
            .catch (err => console.log(err));
        }
      })
      .catch (err => console.log(err));
  }
);

module.exports = router;