// IMPORT libraries
const express = require('express');        // routing
const router = express.Router();           // import only router portion from express library

const Post = require('../../models/Post'); // Post model
const passport = require('passport')       // authentication

// VALIDATORS
const validatePostInput = require('../../validations/post');
const validateCommentInput = require('../../validations/comment');


// @route     GET api/posts
// @desc      GET ALL posts by chronological order
// @access    Public
router.get('/', (req, res) => {
  Post.find()
  .sort({ date: -1 })
  .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ post: 'No posts found' }));
});


// @route     GET api/posts/:id
// @desc      GET a post by Post _id
// @access    Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ post: 'No post found by this id' });
    }
  })
  .catch(() => res.status(404).json({ post: 'No post found by this id' }));
})


// @route     POST api/posts
// @desc      CREATE a new post
// @access    Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // validate required fields
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // passed validation
    // now, CREATE a new post
    const newPost = new Post({
      user: req.user.id,
      image: req.body.image,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar
    });

    // save the new post
    newPost.save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
  }
);


// @route DELETE api/posts/:id 
// @desc DELETE Post by Post _id
// @access Priavte
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      // check if the user is authorized to delete the post
      if (!post.user.toString() === req.user.id) {
        return res.status(400).json({ post: 'You are not authorized to delete this post' });
      } 

      // authorized, now delete the post
      post.remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.json(err));

    })
    .catch(() => res.status(404).json({ post: 'No post found by this id' }));
  }
);


// @route POST api/posts/like/:id  
// @desc LIKE a post by Post _id
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // first, find the post
    Post.findById(req.params.id) 
    .then(post => {

      // check if the user has already liked the post
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ like: 'You have already liked this post' });
      }

      // add the user's "like" to the likes array
      post.likes.unshift({ 
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
       });

      // save the updated post
      post.save()
      .then(post => res.json(post))
      .catch(err => res.json(err));
    })
    .catch(() => res.status(404).json({ post: 'No post found by this id' }));
  }
);


// @route POST api/posts/dislike/:id  
// @desc DISLIKE a post by Post _id
// @access Private
router.post(
  '/dislike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    // first, find the post
    Post.findById(req.params.id)
    .then(post => {
      // check if the user has already liked the post
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ like: 'You have not liked this post' });
      }

      // the user has already liked, now the like will be removed
      const removeIndex = 
      post.likes
      .map(like => like.user.toString())
      .indexOf(req.params.id);

      post.likes.splice(removeIndex, 1);

      // save the updated post
      post.save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
    })
    .catch(() => res.status(404).json({ post: 'No post found by this id' }));
  }
);


// @route POST api/posts/comment/:id  
// @desc ADD comment to the post
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // validate required field
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // passed validation
    Post.findById(req.params.id)
    .then(post => {
      if (post) {

        // add a new comment
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar
        };

        // add "newComment" to the comments array
        post.comments.unshift(newComment);

        // save the updated post
        post.save()
        .then(post => res.json(post))
        .then(err => res.json(err));
      } 
    })
    .catch(() => res.status(404).json({ post: 'No post found by this id' }));
  }  
);


// @route DELETE api/posts/comment/:id/:comment_id  
// @desc DELETE comment on a post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    // first, find the post (the first params will be used :id)
    Post.findById(req.params.id)
    .then(post => {

      // check if the user has already commented on the post (the second params will be used :comment_id)
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ comment: 'You have not commented' });
      }

      // the user's comment will be removed
      const removeIndex = 
      post.comments
      .map(comment => comment._id.toString())
      .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      // save the udpated post
      post.save()
      .then(post => res.json(post))
      .catch(err => res.json(err));

    })
  .catch(() => res.status(404).json({ post: 'No post found by this id' }));
  }
);

module.exports = router;