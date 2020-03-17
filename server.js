// Include import libraries to be used
// express for routing
const express = require('express');

// express for database
const mongoose = require('mongoose');

// bodyPaser for parsing html
const bodyParser = require('body-parser');

// passport for token authentication
const passport = require('passport');

// Include our own files 
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// start with initialization
// create an instance of our app
const app = express();

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
// Passport config
//require('./config/passport')(passport);


// if the route contians /api/users, route to users.js, etc.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// set up port
const port = 8030;
app.listen(port, () => console.log(`Server running on port ${port}`) );