var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChampionSchema = new Schema({
    id: Number,
    champion_key: String,
    name: String,
    title: String
});

// Virtual for this book instance URL
ChampionSchema
.virtual('url')
.get(function () {
  return '/champs/'+this.id;
});

module.exports = mongoose.model('Champion',ChampionSchema);