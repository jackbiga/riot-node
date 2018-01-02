var express = require('express');
var router = express.Router();

var summoner_controller = require('../controllers/summonerController');

router.get('/',summoner_controller.search_summoner);

router.post('/',summoner_controller.list_summoner);

router.get('/league/:id',summoner_controller.summoner_league);

router.get('/match/:id',summoner_controller.summoner_match);

router.get('/game/:id',summoner_controller.summoner_game);

router.get('/mastery/:id',summoner_controller.summoner_mastery);


module.exports = router;
