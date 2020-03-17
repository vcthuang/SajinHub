const express = require ('express');

// only bring in Router
const router = express.Router();

// get json response back
// just one line, don't need return statement
// @route     GET api/posts/test
// @desc      Tests posts route
// @access    Public
router.get('/test', (req, res) => res.json({msg: 'Posts works!'}));

// export so other js file can use this
module.exports = router;