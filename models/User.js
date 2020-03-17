// IMPORT library
const mongoose = require('mongoose');

// data definition(structure) in MongoDB
const Schema = mongoose.Schema;

// create a new instance of Schema => userSchema defines User model
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // we will use external library "gravatar", URL(string) will be used.
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: date,
    defalut: Date.now
  }
});

// create 'users' collection in MongoDB using userSchema, internally we call model 'User', now User has direct link to MongoDB.
module.exports = User = mongoose.model('users', userSchema);