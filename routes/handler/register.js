
var connect = require('../connect');

const register = function(req, res, next) {
  // 1.获取前端发送的数据
  let info = req.body;
  let {username} = info;
  let content = {err: null, data:{}};
  // 2.将数据插入到数据库
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('luntan')
    // 2.2 检查是否用户名已经存在
    collection.find({username: username}).toArray(function(err, docs){
      if(err){
        content.err = 500; // 服务器错误
        res.send(content);
        close();
        return false;
      }
      if(docs.length === 0){  // 用户不存在，插入到数据库
        collection.insertOne(info, function(err, results){
          if(err) {console.log(err); return false;}
          content.err = 200;
          res.send(content);
          close();
        })

      }else{  // 用户已存在
        content.err = 501
        res.send(content);
        close();
      }

    })

  })

}

module.exports = register



