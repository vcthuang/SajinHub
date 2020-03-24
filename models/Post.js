// IMPORT library
const mongoose = require('mongoose');

// data definition(structure) in MongoDB
const Schema = mongoose.Schema;

// create a new instance of Schema => postSchema defines Post model
const postSchema = new Schema({
  // a reference to "users" collection
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String, 
  },
  avatar: {
    type: String,
  },
  likes: [
    // each like object will be stored in the likes array
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      }
    } 
  ],
  comments: [
    // each comment object will be stored in the comments array
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      },
      // each reply object will be stored in the replies array
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String,
          },
          avatar: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    } 
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// create 'posts' collection in MongoDB using postSchema, internally we call model 'Post', now Post has direct link to MongoDB.
module.exports = Post = mongoose.model('posts', postSchema);