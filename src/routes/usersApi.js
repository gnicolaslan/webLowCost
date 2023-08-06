var express = require('express');
const { user, detail, verifyByEmail, update } = require('../controllers/usersApiController');
const { register, login } = require('../controllers/authApiController');
const checkToken = require('../middlewares/checkToken');
var router = express.Router();


/* /api/users */
router
.post('/register',register)
.post('/login',login)
.put('/:id',update)
.get('/verify',verifyByEmail)  
.get('/:id',checkToken,detail)

module.exports = router;
