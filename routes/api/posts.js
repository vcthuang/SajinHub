/*
Get/Create/Edit/Delete "post"
1. GET api/posts   - GET ALL "posts"
2. GET api/posts/:id   - GET A "post" 
3. POST api/posts   - CREATE a new "post"
(4. POST api/posts/:id   - EDIT a "post") 
5. DELETE api/posts/:id   - DELETE a "post" 

Like/Dislike "post"
6. POST api/posts/like/:id   - LIKE a "post" 
(7. POST api/posts/dislike/:id   - DISLIKE a "post")

Create/Delete/Reply "comment"
8. POST api/posts/comment/:id   - CREATE a "comment" 
9. POST api/posts/comment/:id/:comment_id   - REPLY to a "comment"
10. DELETE api/posts/comment/:id/:comment_id   - DELETE a "comment"
11. DELETE api/posts/comment/:id/:comment_id/:replytocomment_id   - DELETE reply on a "comment"
*/


// IMPORT libraries
const express = require('express');         // routing
const router = express.Router();            // import only router portion from express library

const Post = require('../../models/Post');  // Post model
const passport = require('passport')        // authentication

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
  .catch(() => res.status(404).json({ post: 'Posts not found' }));
});


// @route     GET api/posts/:id
// @desc      GET A post by Post _id
// @access    Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ post: 'Post not found' });
    }
  })
  .catch(() => res.status(404).json({ post: 'Post not found' }));
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


// // @route POST api/posts/:id 
// // @desc EDIT a post by Post _id
// // @access Priavte
// router.post(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {

//     // validate required fields
//     const { errors, isValid } = validatePostInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     // passed validation
//     // first, find the POST
//     Post.findById(req.params.id)
//     .then(post => {
//       if (!post) {
//         return res.status(404).json({ post: 'Post not found' });
//       }

//       // Edit the post content
//       const editPost = {
//         user: req.user.id,
//         text: req.body.text,
//         name: req.user.name,
//         avatar: req.user.avatar
//       };

//       // and update
//       Post.findOneAndUpdate(
//         { user: req.user.id },
//         { $set: editPost },
//         { new: true }
//       )
//       .then(post => res.json(post))
//       .catch(err => res.json(err));

//     })
//     .catch(() => res.status(404).json({ post: 'Post not found' }));
//   }
// );


// @route DELETE api/posts/:id 
// @desc DELETE a post by Post _id
// @access Priavte
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // first, find the POST
    Post.findById(req.params.id)
    .then(post => {

      // second, check if the user is authorized to delete the post
      if (!post.user.toString() === req.user.id) {
        return res.status(400).json({ post: 'You are not authorized to delete this post' });
      } 

      // authorized, now delete the post
      post.remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.json(err));

    })
    .catch(() => res.status(404).json({ post: 'Post not found' }));
  }
);


// @route POST api/posts/like/:id  
// @desc LIKE a post by Post _id
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // first, find the POST
    Post.findById(req.params.id) 
    .then(post => {

      // second, check if the user has already liked the post
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

      const removeIndex =
        post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        post.save()
          .then(post => res.json(post))
          .catch(err => res.json(err));
      } else  {
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
      }


    })
    .catch(() => res.status(404).json({ post: 'Post not found' }));
  }
);


// // @route POST api/posts/dislike/:id  
// // @desc DISLIKE a post by Post _id
// // @access Private
// router.post(
//   '/dislike/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
    
//     // first, find the POST
//     Post.findById(req.params.id)
//     .then(post => {

//       // second, check if the user has already liked the post
//       if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
//         return res.status(400).json({ like: 'You have not liked this post' });
//       }

//       // the user has already liked, now the like will be removed
//       const removeIndex = 
//       post.likes
//       .map(like => like.user.toString())
//       .indexOf(req.params.id);

//       post.likes.splice(removeIndex, 1);

//       // save the updated post
//       post.save()
//         .then(post => res.json(post))
//         .catch(err => res.json(err));
//     })
//     .catch(() => res.status(404).json({ post: 'Post not found' }));
//   }
// );


// @route POST api/posts/comment/:id  
// @desc ADD a comment to the post
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
    // first, find the POST
    Post.findById(req.params.id)
    .then(post => {
      if (post) {

        // add a new COMMENT
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
      } else {
        return res.json({ post: 'Post not found' })
      }
    })
    .catch(() => res.status(404).json({ post: 'Post not found' }));
  }  
);


// @route POST api/posts/comment/:id/:comment_id
// @desc "REPLY" to a comment 
// @access Private
router.post(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // validate required field
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // passed validation
    // first, find the POST
    Post.findById(req.params.id)
    .then(post => {

      // second, find the COMMENT (store the found "comment object" in findComment variable)
      const findComment = post.comments.find(comment => comment._id.toString() === req.params.comment_id)
      if (findComment) {
      
        // add the user's reply to the findComment's replies array
        findComment.replies.unshift({ 
          user: req.user.id, 
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar
         });

        // save the updated post
        post.save()
        .then(post => res.json(post))
      } else {
        return res.status(404).json({ comment: 'Comment not found' });
      }
    })
    .catch(() => res.json({ post: 'Post not found' }));
  }
);


// @route DELETE api/posts/comment/:id/:comment_id  
// @desc DELETE comment on a post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    // first, find the POST (:id)
    Post.findById(req.params.id)
    .then(post => {

      // second, check if the user has already commented on the post (:comment_id)
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ comment: 'You have not commented' });
      }

      // the user's comment will be removed
      const removeIndex = 
      post.comments
      .map(comment => comment._id.toString())
      .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      // save the updated post
      post.save()
      .then(post => res.json(post))
      .catch(err => res.json(err));

    })
  .catch(() => res.status(404).json({ post: 'Post not found' }));
  }
);


// @route DELETE api/posts/comment/:id/:comment_id/:replytocomment_id
// @desc DELETE "REPLY" on a comment 
// @access Private
router.delete(
  '/comment/:id/:comment_id/:replytocomment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // first, find the POST
    Post.findById(req.params.id)
    .then(post => {

      // second, find the COMMENT (store the found "comment object" in findComment variable)
      const findComment = post.comments.find(comment => comment._id.toString() === req.params.comment_id)
      if (findComment) {
        
        // then remove "REPLY" from replies's array
        const removeIndex = findComment.replies.map(reply => reply._id.toString()).indexOf(req.params.replytocomment_id)

        findComment.replies.splice(removeIndex, 1);

        post.save()
        .then(post => res.json(post))
        .catch(err => res.json(err))
      } else {
        return res.status(404).json({ comment: 'Comment not found' });
      }
    })
    .catch(() => res.status(404).json({ post: 'Post not found' }));
  }
);


module.exports = router;