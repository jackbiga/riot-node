var Item = require('../models/item');
var async = require('async');

// Display list of all books
exports.item_list = function(req, res, next) {
    
    Item.find({ plaintext: { $ne: null } }, 'name plaintext id')
    .sort({'name':1})
    .exec(function (err, list_items) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('item_list', { title: 'Items', item_list:  list_items});
    });

};  

exports.get_item = function(req, res, next) {

    async.parallel({
        item: function(callback) {

            Item.findOne({'id':req.params.id})
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.item==null) { // No results.
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('item', { title: results.item.name, item:  results.item});
    });
};  