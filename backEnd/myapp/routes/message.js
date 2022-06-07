var express = require('express');
var router = express.Router();
var message = require('../controllers/MessageController')

router.get('/getMessage', message.getMessage);
router.post('/addMessage', message.addMessage);
module.exports = router;