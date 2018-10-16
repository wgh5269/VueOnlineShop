var mongoose = require('mongoose');
//定义表模型

var Schema = mongoose.Schema;

var productSchema = new  Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String
});

module.exports = mongoose.model('Good',productSchema);
