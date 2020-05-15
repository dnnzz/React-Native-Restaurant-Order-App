var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    phone: {
        type: String,
        required: true
      },
      name: {
        type: String, 
      },
      address:{
        type: String,
        required: true
      },
      basket: {
        type: Object
      },
      total: {
        type:Number
      }
});

module.exports = mongoose.model('Order', OrderSchema);