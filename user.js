var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: {
        type: String,
        required: true
      },
    phone: {
        type: Number,
        default:0 
      },
      address:{
        type:String,
        required: true
      }
});

module.exports = mongoose.model('User', UserSchema);