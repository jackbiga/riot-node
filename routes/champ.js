var express = require('express');
var router = express.Router();

var champ_controller = require('../controllers/champController');

router.get('/',champ_controller.champ_list);

router.get('/:id',champ_controller.get_champ);

module.exports = router;