var express = require('express');
const { verifyByEmail, update, getCodeToResetPassword, resetPassword, finishPurchase } = require('../controllers/usersApiController');
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
.post('/auth/reset-password/:email',getCodeToResetPassword)
.post('/reset-password/:email',resetPassword)
.post('/finish-purchase',finishPurchase)

module.exports = router;
