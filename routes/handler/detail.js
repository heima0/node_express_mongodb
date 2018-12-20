
var connect = require('../connect');

// 因为前端发送过来的_id是一个字符串，在根据id在数据库里查找的时候不能直接用字符数
//所以需要使用ObjectId处理一下
const ObjectId = require('mongodb').ObjectId

// 链接数据库，获取分类，返回回来
const detail = function(req, res, next) {
  console.log(req.query)
  let id = req.query.id;
  let content = {err: null, data:{}};
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('commits')
    // 2.2 查找数据并返回
    collection.find({_id: ObjectId(id)}).toArray(function(err, result){
      let article = '';
      if(err) {
        content.err = 500;
        close();
        next(article);
        return false;
      }
      article = result[0];
      console.log(article);
      next(article);
      close();
    })
  })

}

module.exports = detail




