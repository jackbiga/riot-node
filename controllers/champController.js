var Champion = require('../models/champion');
const _ = require('lodash');
var async = require('async');

// Display list of all books
exports.champ_list = function(req, res, next) {
    
    Champion.find({}, 'name title id')
    .sort({'name':1})
    .exec(function (err, list_champs) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('champ_list', { title: 'Champions', champ_list:  list_champs});
    });

};  

exports.get_champ = function(req, res, next) {
        
        async.parallel({
            champ: function(callback) {
    
                Champion.findOne({'id':req.params.id})
                  .exec(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.champ==null) { // No results.
                var err = new Error('Champ not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('champ', { title: results.champ.name, champion:  results.champ});
        });
};  