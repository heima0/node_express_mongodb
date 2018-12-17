
var connect = require('../connect');

const login = function(req, res, next) {
  // 1.获取前端发送的数据
  let info = req.body;
  let {username, password} = info;
  console.log(info)
  let content = {err: null, data:{}};
  // 2.将数据插入到数据库
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('luntan')
    // 2.2 检查是否用户名已经存在
    collection.find({username: username, password: password}).toArray(function(err, docs){
      if(err){
        content.err = 500; // 服务器错误
        res.send(content);
        close();
      console.log(12345678)

        return false;
      }
      if(docs.length === 0){  // 用户或密码不对
        content.err = 501; 
        res.send(content);
        close();
        console.log(125678)
        
      }else{  // 用户登陆成功
        content.err = 200;
        delete docs[0].password;
        content.data = docs[0];
        res.send(content);
        close();
      }
      console.log(123456)

    })

  })

}

module.exports = login



