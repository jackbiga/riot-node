const Request = require('request');
var api_key = require('../myRiotKey');
var _ = require('lodash');
var my_key =process.env.RIOT_KEY || api_key.myKey;

// Display list of all books
exports.search_summoner = function(req, res, next){
    res.render('search_summoner', {title: 'Search summoner'})
};

exports.list_summoner = function(req, res, next) {
    
    var summName = req.body.summonerName;
    var request = 'https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summName+'?api_key='+my_key;
    Request.get(request, function (error, response, body) {
        if (error) {
            return next(error);
        }

        const code = response.statusCode;
        const data = JSON.parse(body);
        
        res.render('summoner', { title: summName, summoner: data, statusCode: code });
    });

};  

exports.summoner_league = function(req, res, next) {
    
    var summId = req.params.id;
    var request = 'https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+summId+'?api_key='+my_key;
    Request.get(request, function (error, response, body) {
        if (error) {
            return next(error);
        }

        const code = response.statusCode;
        var data = JSON.parse(body);

        if(_.isEmpty(data)){
            data = null;
        }
        
        res.render('league', { title: "League", league: data, statusCode: code });
    });

};  

exports.summoner_match = function(req, res, next) {

    var max_matches = 10;
    
    var Id = req.params.id;
    var request = 'https://euw1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+Id+'?endIndex='+max_matches+'&api_key='+my_key;
    Request.get(request, function (error, response, body) {
        if (error) {
            return next(error);
        }

        const code = response.statusCode;
        var data = JSON.parse(body);

        if(_.isEmpty(data)){
            data = null;
        }
        
        res.render('match', { title: "Last Match", match: data, statusCode: code });
    });

};  

exports.summoner_game = function(req, res, next) {
    
    var Id = req.params.id;
    var request = 'https://euw1.api.riotgames.com/lol/match/v3/matches/'+Id+'?api_key='+my_key;
    Request.get(request, function (error, response, body) {
        if (error) {
            return next(error);
        }

        const code = response.statusCode;
        var data = JSON.parse(body);

        if(_.isEmpty(data)){
            data = null;
        }
        
        res.render('game', { title: "Game", game: data, statusCode: code });
    });

};  

exports.summoner_mastery = function(req, res, next) {
    
    var Id = req.params.id;
    var request = 'https://euw1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+Id+'?api_key='+my_key;
    Request.get(request, function (error, response, body) {
        if (error) {
            return next(error);
        }

        const code = response.statusCode;
        var data = JSON.parse(body);

        if(_.isEmpty(data)){
            data = null;
        }
        
        res.render('mastery', { title: "Mastery", mastery: data, statusCode: code });
    });

};  