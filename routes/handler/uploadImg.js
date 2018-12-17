var formidable = require('formidable');
var path = require('path')
var fs = require('fs');


const uploadImg = function(req, res, next) {
  //接收上传图片的时候，图片的处理
  // 文件将要上传到哪个文件夹下面
  var uploadfoldername = 'uploadfiles';
  var uploadfolderpath = __dirname + '/../../public/images/' + uploadfoldername;

  // ---------------------- 跨域上传 ----------------------
  // 使用第三方的 formidable 插件初始化一个 form 对象
  var form = new formidable.IncomingForm();

  //设置接收到的图片存储的位置，在这里只是一个暂存文件夹
  form.uploadDir = path.join(__dirname,"/temp");
  
  // 处理 request
  form.parse(req, function (err, fields, files) {
      if (err) {
          return console.log('formidable, form.parse err');
      }

      //取出图片文件内容
      var file = files['wangEditor_uploadImg'];
      // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的路径
      var tempfilepath = path.join(__dirname,'/temp/'+path.basename(file.path));
      // 获取文件类型
      var type = file.type;
      // 获取文件名，并根据文件名获取扩展名
      var filename = file.name;
      var extname = path.extname(filename)
      // 将文件名重新赋值为一个随机数（避免文件重名）
      filename = Math.random().toString().slice(2) + extname;

      // 构建将要存储的文件的完整路径
      var filenewpath = uploadfolderpath + '/' + filename;
      // 将临时文件保存为正式的文件

      let readStream = fs.createReadStream(tempfilepath)
      let writeStream = fs.createWriteStream(filenewpath)
      
      readStream.on('data',(chunk)=>{
          writeStream.write(chunk)
      })
      readStream.on('end',(chunk)=>{
          res.json({
              errno: 0,
              imgurl:'/images/uploadfiles/'+filename
          })
          // 删除临时文件
          fs.unlinkSync(tempfilepath)
      })

  });
}

module.exports = uploadImg



