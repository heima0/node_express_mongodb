### 接口文档


1. 注册请求
  
  url: /api/v1/register
  type: post
  data: {username, password, nickname}

  响应成功
  {
    code: 200,
    data: {}
  }
  响应失败
  {
    code: 501, <!-- 用户已存在 -->
    data: {}
  }
  服务错误
  {
    code: 500,
    data: {}
  }


2. 登陆请求
  
  url: /api/v1/login
  type: post
  data: {username, password}

  响应成功
  {
    err: 200,
    data: {}
  }
  响应失败
  {
    err: 501, <!-- 用户名或密码错误 -->
    data: {}
  }
  服务错误
  {
    err: 500, <!-- 服务器繁忙，请稍后再试 -->
    data: {}
  }

3. 发帖（commit页-富文本编辑器）
  url: /api/v1/commit
  type: post
  响应成功
  {
    err: 200,
    data: {}
  }
  服务错误
  {
    err: 500, <!-- 服务器繁忙，请稍后再试 -->
    data: {}
  }

4. 分类（服务端渲染）




