
var connect = require('../connect');

const commitList = function(req, res, next) {
  // 1.获取前端发送的数据
  let info = req.query;
  // console.log(info,20002222) // { page: '1', perpage: '5', sort: '1', classify: 'all' }
  // {
  //     "_id": "5c133e28d81632e689de9586",
  //     "title": "测试专题1",
  //     "content": "<p>这是一个测试专题而已</p>",
  //     "author": "霸天",
  //     "author_id": "5c0f4d51ab875bc7edac0b97",
  //     "hot": "0",
  //     "time": "2018/12/14 下午1:22:48",
  //     "classify": "情感"
  // }
  let content = {err: null, data:{}, totalData: 0};
  let classify = {}
  let time = {time: info.time-0};
  switch(info.classify){
    case '科技': classify = {classify: '科技'};
    break;
    case '自然': classify = {classify: '自然'};
    break;
    case '动物': classify = {classify: '动物'};
    break;
    case '情感': classify = {classify: '情感'};
    break;
    default: classify = {};
    break;
  }
  // 2.1 链接数据库
  connect(function(db, close){
    let collection = db.collection('commits')
    // 2.2 查找数据    
    // .limit(info.perpage-0).skip((info.page-1)*(info.perpage-0)
    collection.find(classify).sort(time).toArray(function(err, result){
      if(err) {
        content.err = 500;
        content.data.msg = '服务器错误';
        res.send(content);
        close();
        return false;
      }
      content.err = 200;
      // 获取到的总数据的条数
      content.totalData = result.length;
      // 对排好序的数据进行截取
      content.data = result.splice((info.page-1)*info.perpage, info.perpage*1) 
      res.send(content);
      close();
    })
  })

}

module.exports = commitList



