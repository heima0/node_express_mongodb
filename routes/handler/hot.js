

const connect = require('../connect')

// 因为前端发送过来的_id是一个字符串，在根据id在数据库里查找的时候不能直接用字符数
//所以需要使用ObjectId处理一下
const ObjectId = require('mongodb').ObjectId

// 处理点赞
const hotHandler = (req, res) => {
    //取出要提交的的数据返回给前端
    // 获取到的，要点赞的帖子的_id
    let {id} = req.query
    connect((db, close) => {
        let commits = db.collection("commits")
        let content = {err:200,data:{}}
        // 更新
        // 找到id对应的帖子之后，里面update方法中配置$inc来使该帖子的hot数+1
        commits.updateOne({_id: ObjectId(id)}, {$inc: {hot: 1}}, (err, results) => {
          if(err) {
            content.err = 500;
            console.log(err)
            res.send(content);close()
            return false;
          }
          commits.find({_id: ObjectId(id)}).toArray(function(e, re){
            console.log(re,88888888)
          })

          res.send(content);close()
        });

    })

}

module.exports = hotHandler