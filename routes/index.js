var express = require('express');
var router = express.Router();
var classify = require('./handler/classify')
var detail = require('./handler/detail')

/* GET home page. */
// 页面配置路由
router.get('/', function(req, res, next) {
  res.render('index', { title: '社区' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册页' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆页' });
});

router.get('/commit', classify, function(classify1, req, res, next) {
  res.render('commit', { title: '发帖', classify1: classify1 });
});

router.get('/commitList', function(req, res, next) {
  res.render('commitList', { title: '列表页'});
});

router.get('/article', detail, function(detail, req, res, next) {
  res.render('article', { title: '详情页', detail: detail });
});







module.exports = router;
