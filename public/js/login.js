;
$('.container form').submit(login);

function login(e){
  e.preventDefault();
  let username = $.trim($('#username').val())
  let password = $.trim($('#password').val())
  if(username === ''||password === ''){
    // alert('请完善您的信息')
    $.message({
      message: '请完善您的信息',
      time: 1500,
      type: 'warning'
    })
    return false;
  }else if(password.length < 6){
    // alert('密码长度不能少于6')
    $.message({
      message: '密码长度不能少于6',
      time: 1500,
      type: 'warning'
    })
    return false;
  }

  $.ajax({
    url: '/api/v1/login',
    type: 'post',
    data: {username, password},
  })
  .done(function(result) {
    console.log(result);
    if(result.err === 501){
      $.message('用户名或密码错误')
    }else if(result.err === 500){
      $.message('服务器繁忙，请稍后再试')
    }else if(result.err === 200){
      $.message('登陆成功')
      $.cookie('mongo_info', JSON.stringify(result.data), {expires: 7, path: '/'})
      setTimeout(function(){
        window.location.href = '/'
      },2000)
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  


}


