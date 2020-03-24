// Pofile routing
//
// Profile managment:
// 1.  (Profile Post)       POST api/profile
// 2.  (Profile Delete)     DELETE api/profile
// 3.  (Profile Get)        GET api/profile
// 4.  (Profile Get All)    GET api/profile/all
// 5.  (Profile Get Handle) GET api/profile/handle/:handle
// 6.  (Profile Get User)   GET api/profile/user/:id
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
// 
// END Import libraries

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
          ).then (profile => res.json(profile));
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
            .catch (err=>res.status(404).json(err));
        }
      })
      .catch (err=>res.status(404).json(err));
  }
);

// @route     DELETE api/profile
// @desc      Delete user from user and profile documents
// @access    Private
router.delete(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    // Delete user from profiles document in MongoDB
    Profile.findOneAndRemove({user: req.user.id})
      .then (profile => {
        // Delete user document only if user profile exists
        if (profile) {  
          // Delete user from users document in MongoDB
          User.findOneAndRemove({_id: req.user.id})
            .then (()=>res.json({success: true}))
            .catch (err => console.log(err));
        } else {
          return res.status(400).json ({noprofile: 'User has no profile'});
        }
      })
      .catch (err=>res.status(404).json(err));
  }
);

// @route     GET api/profile
// @desc      Get current user's profile
// @access    Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {};

    // Match user in profile document
    Profile.findOne({user: req.user.id})
      // Get name and avatar from user document
      .populate ('user', ['name', 'avatar'])
      .then (profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(400).json(errors);
        }

        // Place user profile in response
        res.json (profile);
      })
      .catch (err=>res.status(404).json(err));
  }
);

// @route     GET api/profile/all
// @desc      Get all profiles
// @access    Public
router.get(
  '/all',
  (req, res) => {
    
    Profile.find()    // find everything
      .populate ('user',['name','avatar'])
      .then (profiles => {
        // can't not use !profile as populate gives empty array []
        if (profiles.length === 0) 
          return res.status(400).json({noprofile: 'There are no profiles'});
        
        // Place profiles in response
        res.json (profiles);
      })
      .catch (err=>res.status(404).json(err));
  }
);

// @route     GET api/handle/:handle
// @desc      Get an user profile by handle
// @access    Public
router.get(
  '/handle/:handle',
  (req, res) => {
    
    Profile.findOne({handle: req.params.handle})
      .populate ('user',['name','avatar'])
      .then (profile => {
        if (!profile) 
          return res.status(400).json({noprofile: 'There is no profile for this user'});
        
        // Place profile in response
        res.json (profile);
      })
      .catch (err=>res.status(404).json(err));
  }
);

// @route     GET api/profile/user/:user_id
// @desc      Get an user profile by user ID
// @access    Public
router.get(
  '/user/:user_id',
  (req, res) => {
    
    Profile.findOne({user: req.params.user_id})
      .populate ('user',['name','avatar'])
      .then (profile => {
        if (!profile) 
          return res.status(400).json({noprofile: 'There is no profile for this user'});
        
        // Place profile in response
        res.json (profile);
      })
      .catch (err=>res.status(404).json(err));
  }
);

module.exports = router;