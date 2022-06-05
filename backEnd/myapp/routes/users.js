var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController');
/* GET users listing. */
router.post('/login', user.login);
router.get('/checkBeforeRegister', user.checkBeforeRegister);
router.post('/register', user.register);
router.post('/changePassword', user.changePassword);
module.exports = router;