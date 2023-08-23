var express = require('express');
const { verifyByEmail, update, detail, resetPassword } = require('../controllers/usersApiController');
const { register, login, profile } = require('../controllers/authApiController');
const checkToken = require('../middlewares/checkToken');
var router = express.Router();


/* /api/users */
router
.post('/register',register)
.post('/login',login)
.put('/:id',update)
.get('/verify',verifyByEmail)  
.get('/profile/:id',checkToken,profile)
.post('/reset-password/:email',resetPassword)

module.exports = router;
