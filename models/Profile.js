// Profile Data Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Start definition
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,      // Linking document
    ref: 'users'                      // Get ID from users document
  },

  handle: {                           // Unique identifier of the user
    type: String,
    required: true,
    max: 40
  },

  bio: {
    type: String,                     // A little something about the user
    max: 150
  },

  interests: {                         // General interests or hobbies
    type: [String]
  },

  website: {                          // User's own website
    type: String
  },

  location: {                         // Location of the user by city and country
    city: {
      type: String
    },
    country: {
      type: String
    },
  },

  joinDate: {                           // Royal customer program!
    type: Date,
    default: Date.now
  },

  friends: [                            // people that ther user is following or subscribed to
    {
      user: {                         
        type: Schema.Types.ObjectId,
        ref:'users'
      },

      beginDate: {
        type: Date,
        default: Date.now
      },
    }
  ],

  followers: [                          // People that follows user
    {                                   // This table will be populate internally, not through POST
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },

      beginDate: {
        type: Date,
        default: Date.now
      },
    }
  ]
});

module.exports = Profile = mongoose.model('profile', profileSchema);