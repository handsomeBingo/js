var http=require("http"),
    url=require("url"),
    crypto=require("crypto"),
    fs=require("fs");
var server=http.createServer(function(req,res){
    if(req.url=="/"){
        res.setHeader("Content-Type","text/html;charset=utf-8");
        fs.createReadStream("./index.html").pipe(res);
    }else if(req.url=="/index.js"){
        //如果在缓存时间内不用发送请求
        res.setHeader("Expires",new Date(new Date()+3000).toUTCString());
        res.setHeader("Cache-control","max-age=3")
        fs.createReadStream("./index.js").pipe(res);
        console.log(1);

    }else {
        res.statusCode=404;
        res.end("not found");
    };
});
server.listen(10112,function(){
    console.log("victory");
});