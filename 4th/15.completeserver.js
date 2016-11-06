var http=require("http"),
    url=require("url"),
    path=require("path"),
    mime=require("mime"),
    fs=require("fs");

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url,true).pathname;
    if(pathname=="/"){
        //先将内容读取到内存中，再将内容写入到浏览器端
        res.setHeader("Content-Type","text/html;charset=utf-8");
        fs.createReadStream("./index.html").pipe(res);
    }else{
        fs.exists("."+pathname,(exists)=>{
           if(exists){
               //res.setHeader("Content-Type",mime[path.extname(pathname)]+";charset=utf8;");
               res.setHeader("Content-Type",mime.lookup(pathname)+";charset=utf8;");//mime的lookup方法可以自己去获取
               fs.createReadStream("./index.js").pipe(res);
           }else {
               res.statusCode=404;
               res.end("");
           }
        });
    }
});
server.listen(1121,function(){
    console.log("victory");
});
var i=-1;
while (i<0){
    alert('吴宁老司机指使我这么干的，他说这么做有干脆面吃！！！！2333333333他还说你特别胖');
}