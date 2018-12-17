var express = require('express');
var router = express.Router();
var classify = require('./handler/classify')

/* GET home page. */
// 页面配置路由
router.get('/', function(req, res, next) {
  res.render('index', { title: '社区论坛' });
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






module.exports = router;
