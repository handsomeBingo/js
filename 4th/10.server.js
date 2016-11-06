var http=require("http"),
    url=require("url"),
    fs=require("fs");
var server=http.createServer(function(req,res){
    //req.url默认根路径是 /
    //req.method 请求方式
    // req.headers 获取请求头 通过小写的属性名来获取内容例如connection req.headers.connerction
    //我想缓存index.js文件，
    // 1先获取index.js ctime 时间
    // 2下次服务器时会带有Ctime 如果当前的ctime和浏览器传过来的不一致，返回最新文件，如果一致返回304


    if(req.url=="/"){
        //先将内容读取到内存中，再将内容写入到浏览器端
        res.setHeader("Content-Type","text/html;charset=utf-8");
        fs.createReadStream("./index.html").pipe(res);
    }else if(req.url=="/index.js"){
        var timer=fs.statSync("./index.js").ctime.toUTCString();
        //如果没有发送过last-modified 第二次访问时是不会带有if-modified-since
        var ctime=req.headers["if-modified-since"];//上一次修改时间
        //在请求头中 if-modified-since
        if(ctime&&(ctime==timer)){
            //如果有说明是第二次
            res.statusCode=304;
            res.end("");

        }else {
            //第一次访问
            res.setHeader("Last-Modified",timer);
            fs.createReadStream("./index.js").pipe(res);
            console.log(req.headers);
        }
    }else {
        res.statusCode=404;
        res.end("not found");
    };
});
server.listen(10111,function(){
    console.log("victory");
});