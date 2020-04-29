// BEGIN Import libraries
//
const express = require('express');         // express for routing
const mongoose = require('mongoose');       // MongoDB for database
const bodyParser = require('body-parser');  // bodyPaser for parsing html
const passport = require('passport');       // passport for token authentication

const users = require('./routes/api/users');      // Include our own files 
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//
// END Import libraries

// START initialization
//
// create an instance of our app
const app = express();

// a way to access a specific folder
const path = require('path');

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;
//
// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected!'))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// grab passport from config
require('./config/passport')(passport);


// if the route contians /api/users, route to users.js, etc.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// in case of Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder and start index.html
  app.use(express.static('client/build'));

  // default 'index,js'
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.js'));
  })
}

// set up port
const port = process.env.PORT || 8030;
app.listen(port, () => console.log(`Server running on port ${port}`) );
//
// END initialization