var express = require('express');
var router = express.Router();
var message = require('../controllers/MessageController')

router.get('/getMessage', message.getMessage);
module.exports = router;