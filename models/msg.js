var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgShema = new Schema({
  firstname:  String,
  emailFrom:   String,
  emailTo:   String,

});

var msg = mongoose.model('msg',msgSchema);

module.exports = msg