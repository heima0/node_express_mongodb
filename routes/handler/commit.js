
var connect = require('../connect');

const commit = function(req, res, next) {
  // 1.获取前端发送的数据
  let info = req.body;
  // { title: '测试专题1',
  // content: '<p>测试内容</p>',
  // author: '霸天',
  // author_id: '5c0f4d51ab875bc7edac0b97',
  // hot: '0',
  // time: '2018/12/14 下午1:16:50',
  // classify: '情感' }
  let content = {err: null, data:{}};
  // 2.将数据插入到数据库
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('commits')
    // 2.2 将数据插进去
    collection.insertOne(info, function(err, result){
      if(err) {
        content.err = 500;
        content.data.msg = '服务器错误';
        res.send(content);
        close();
        return false;
      }
      content.err = 200;
      content.data.msg = '提交成功';
      res.send(content);
      close();
    })
  })

}

module.exports = commit



