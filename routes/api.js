var express = require('express');
var handler_register = require('./handler/register');
var handler_login = require('./handler/login');
var handler_img = require('./handler/uploadImg');
var handler_commit = require('./handler/commit');
var router = express.Router();


/* GET home page. */
// api配置路由
// 注册
router.post('/register', handler_register);

// 登陆
router.post('/login', handler_login);

// 图片接口
router.post('/uploadImg', handler_img);

// 发帖接口
router.post('/commit', handler_commit);



module.exports = router;
