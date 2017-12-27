var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    id: Number,
    plaintext: String,
    description: String,
    name: String
});

// Virtual for this book instance URL
ItemSchema
.virtual('url')
.get(function () {
  return '/items/'+this.id;
});

module.exports = mongoose.model('Item',ItemSchema);