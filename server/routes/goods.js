var express = require('express');
var router = express.Router();

var  mongoose = require('mongoose');
var Goods = require('./../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connection.on("connected",function () {
      console.log("MongoDb 连接成功");
});
mongoose.connection.on("error",function () {
  console.log("MongoDb 连接失败");
});
mongoose.connection.on("disconnectde",function () {
  console.log("MongoDb 断开连接");
});

router.get('/',function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel= req.param("priceLevel");
  let sort  = req.param("sort");
  let skip = (page-1)*pageSize;
  let priceGt='', priceLte='';
  let param ={};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=500;break;
      case '1':priceGt = 500;priceLte=1000;break;
      case '2':priceGt = 1000;priceLte=8000;break;
      case '3':priceGt = 8000;priceLte=100000;break;
    }
    param = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }
  let goodsModel = Goods.find(param).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) {
       if (err){
         res.json({
           status:"1",
           message:err.message
         });
       } else{
         res.json({
            status:"0",
            message:'连接成功',
           result:{
              count:doc.length,
              list:doc
           }
         });
       }
  });
});
module.exports = router;
