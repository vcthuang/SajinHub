// IMPORT libraries
const express = require('express');
// import only router portion from express library
const router = express.Router();
const User = require('../../models/User');

// @route     POST api/user/register
// @desc      REGISTER user 
// @access    Public

router.post('/register', (req, res) => {
  
})

// export router
module.exports = router;