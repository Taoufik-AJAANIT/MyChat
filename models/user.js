var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname:  String,
  lastname: String,
  email:  {unique: true ,type : String} ,
  password:   String,

});

var user = mongoose.model('user', userSchema);

module.exports.user = user
module.exports.findUser = findUser


var findUser = obj =>{
    user.findOne({email:obj.email,password :obj.password},(err,result) =>{
        return result

    })

}

var addUSer = data  => {
    var user = new user(data);
    user.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}