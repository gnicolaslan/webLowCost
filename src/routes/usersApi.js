var express = require('express');
const { user, detail, verifyByEmail, update } = require('../controllers/usersApiController');
var router = express.Router();


/* /api/users */
router
.put('/:id',update)
.get('/verify',verifyByEmail)  
.get('/', user)
.get('/:id',detail)

module.exports = router;
