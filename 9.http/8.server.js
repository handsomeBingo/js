var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
/*var mime = {
    '.css':'text/css',
    '.js':'application/x-javascript'
};*/
//第三方插件 mime
var mime = require('mime');
var url = require('url');//专门用来处理路径
http.createServer(function (req,res) {
    //不想要?后面的内容
    var pathname = url.parse(req.url,true).pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else{
        //req.url  /index.js  /favicon.ico
        fs.exists('.'+pathname,function (exists) {
            if(exists){
                //查看当前路径的文件类型
                res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
                fs.createReadStream('.'+pathname).pipe(res);
            }else{
                res.statusCode = 404;
                res.end('not found');
            }
        })
    }
}).listen(3001);