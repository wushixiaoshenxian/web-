var express = require('express');
var router = express.Router();
var event = require('../controllers/EventController')

router.get('/getFriend', event.getFriend);
module.exports = router;
