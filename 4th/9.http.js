var http=require("http"),
    url=require("url"),
    fs=require("fs");
var server=http.createServer(function(req,res){
   //req:request储存着所有客户端的请求信息，可读写流
    //res:response储存着所有服务器响应的方法及信息 res是个可写流

    res.writeHead(200,{"content-type":"text/plain;charset=utf-8;"});
    res.write("hello");
    res.end("world");



});
server.listen(1101,"localhost",function(){
    //第一个函数是端口号，第二个是地址（默认本机），第三个是回调函数，监听成功则执行该方法
});