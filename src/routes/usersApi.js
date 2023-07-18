var express = require('express');
const { user, detail } = require('../controllers/usersApiController');
var router = express.Router();


/* /api/users */
router
  .get('/', user)
  .get('/:id',detail)

module.exports = router;
