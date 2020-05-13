var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    username: {
        type: String,
        required: true
      },
      orders: {
        type: String, 
      },
      ordertotal:{
        type: Number
      }
});

module.exports = mongoose.model('Order', OrderSchema);