var express = require('express');
var router = express.Router();
var event = require('../controllers/EventController')

router.get('/getFriend', event.getFriend);
router.post('/addFriend', event.addFriend);
router.get('/getEvent', event.getEvent);
router.post('/addEvent', event.addEvent)
module.exports = router;
