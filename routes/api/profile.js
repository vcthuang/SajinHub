const express = require ('express');

// only bring in Router
const router = express.Router();

// get json response back
// just one line, don't need return statement
// @route     GET api/profile/test
// @desc      Tests profile route
// @access    Public
router.get('/test', (req, res) => res.json({msg: 'Profile works!'}));

// export so other js file can use this
module.exports = router;