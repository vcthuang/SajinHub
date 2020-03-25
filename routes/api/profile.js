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
// Following/Friends management:
// 7.  (Profile Post Following)     POST api/profile/followings/:id 
// 8.  (Profile Delete Following)   DELETE api/profile/followings/:id 
//
// Followers/Subscribers management:
// 9.  This table/document is updated with #7 & #8


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
            .catch (err=>res.status(404).json(err));
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

// @route     Post api/profile/followings/:user_id
// @desc      Add following/friend to profile
// @access    Private
router.post(
  '/followings/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne ({user: req.user.id})
      .then( profile => {
        if (!profile)
          return res.status(400).json({noprofile: 'Please create profile before adding followings'});

        // make sure the user can only do like once
        if ( profile.followings.filter(following => following._id.toString() === req.params.user_id).length >0 ) {
          return res
            .status(400)
            .json({ alreadyfollowing: 'User is already following'});
        }

        // Add user_id to following array for current profile user
        profile.followings.unshift(req.params.user_id);
        // Write to MongoDB
        profile.save().then (profile => res.json(profile));

        // Update followers/subscriber array in req.params.user_id's / friend's profile
        // By this state, we don't expect exception
        Profile.findOne({user: req.params.user_id})
          .then (friendprofile => {
            friendprofile.followers.unshift(req.user.id);
            friendprofile.save().then (friendprofile => res.json(friendprofile));
          })
          .catch (err=>res.status(404).json(err));
      })
      .catch (err=>res.status(404).json(err)); 
  }
);

// @route     DELETE api/profile/followings/:user_id
// @desc      Delete following/friend to profile
// @access    Private
router.delete(
  '/followings/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne ({user: req.user.id})
      .then( profile => {
        if (profile) {
          const removeIndex = profile.followings
            .map (following => following._id)
            .indexOf (req.params.user_id);
          
          if (removeIndex === -1)  // Not found
            return res.status(400).json({followingnotfound: 'following not found'});

          // splice out of array
          profile.followings.splice (removeIndex, 1);
          profile.save().then (profile => res.json(profile));

          // Update followers/subscriber array in req.params.user_id's / friend's profile
          // By this state, we don't expect exception
          Profile.findOne({user: req.params.user_id})
          .then (friendprofile => {
            const removeIndex1 = profile.followers
              .map (follower => follower._id)
              .indexOf (req.user.id);

            friendprofile.followers.splice(removeIndex1, 1);
            friendprofile.save().then (friendprofile => res.json(friendprofile));
          })
          .catch (err=>res.status(404).json(err));

        } else {
          // The code should have never came to this place
          return res.status(400).json({noprofile: 'Please create profile before deleting followings'});
        }
      })
      .catch (err=>res.status(404).json(err));
  }
);

module.exports = router;