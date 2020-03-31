var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        default: 0,
        validate(value) { 
          if (value < 0) throw new Error("Fiyat negatif olamaz.");
        }
      },
      quantity: {
        type: Number,
        default: 0,
        validate(value) { 
          if (value < 0) throw new Error("Miktar negatif olamaz.");
        }
      }
});

module.exports = mongoose.model('Item', ItemSchema);