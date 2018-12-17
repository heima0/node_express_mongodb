
;
$('.container form').submit(register);

function register(e){
  e.preventDefault();
  let username = $.trim($('#username').val())
  let password = $.trim($('#password').val())
  let nickname = $.trim($('#nickname').val())

  if(username === ''||password === ''||nickname === ''){
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

  let data = {username: username, password: password, nickname: nickname};

  $.ajax({
    url: '/api/v1/register',
    type: 'post',
    data: data,
  })
  .done(function(res) {
    console.log(res);
    if(res.err == 200){
      $.message('提交成功')
      setTimeout(function(){
        delete data.password;
        $.cookie('mongo_info', JSON.stringify(data), {expires: 7, path: '/'})
        window.location.href = '/'
      }, 2000)
    }else if(res.err == 501){
      $.message('用户名已存在');
      return false;
    }else if(res.err == 500){
      $.message('服务器繁忙，请稍后再试')
      return false;
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

$('.reset').on('click', function(){
  $('#username').val('')
  $('#password').val('')
  $('#nickname').val('')
})

// message:' 操作成功',    //提示信息
// time:'2000',           //显示时间（默认：2s）
// type:'success',        //显示类型，包括4种：success.error,info,warning
// showClose:false,       //显示关闭按钮（默认：否）
// autoClose:true,        //是否自动关闭（默认：是）







