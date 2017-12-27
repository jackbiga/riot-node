var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController');

router.get('/',item_controller.item_list);

router.get('/:id',item_controller.get_item);

module.exports = router;
