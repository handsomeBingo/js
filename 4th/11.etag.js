var http=require("http"),
    url=require("url"),
    crypto=require("crypto"),
    fs=require("fs");
var server=http.createServer(function(req,res){
    if(req.url=="/"){
        res.setHeader("Content-Type","text/html;charset=utf-8");
        fs.createReadStream("./index.html").pipe(res);
    }else if(req.url=="/index.js"){
        //内容频繁的更改，，精确不到秒，很多服务器修改时间不准确，所以我们判断文件中的内容，如果有区别，说明有更改，发送给浏览器端
        var data=fs.readFileSync("./index.js");
        data=crypto.createHash("md5").update(data).digest("hex");
        //都能获取一个最新值和上一次设置的比较，if-none-match
        var match=req.headers["if-none-match"];
        if(match&&(match==data)){
            res.statusCode=304;
            res.end("");
            console.log(res.etag);
        }else {
            res.setHeader("Etag",data);//第一次访问时把内容进行加密放到头部
            fs.createReadStream("./index.js").pipe(res);
        }
    }else {
        res.statusCode=404;
        res.end("not found");
    };
});
server.listen(10112,function(){
    console.log("victory");
});