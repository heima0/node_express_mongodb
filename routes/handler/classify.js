
var connect = require('../connect');

// 链接数据库，获取分类，返回回来
const classify = function(req, res, next) {
  // 1.获取前端发送的数据
  let content = {err: null, data:{}};
  // 2.将数据插入到数据库
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('classify')
    // 2.2 将数据插进去
    collection.find({}).toArray(function(err, result){
      let classify1 = [];
      if(err) {
        content.err = 500;
        close();
        next(classify1);
        return false;
      }
      console.log(result);
      classify1 = result;
      next(classify1);
      close();
    })
  })

}

module.exports = classify




