var http=require("http"),
    url=require("url"),
    fs=require("fs");
var rs=fs.createReadStream("path.txt");//因为可读流返回的是一个可读流对象


//如果想让data是一个字符串，常用设置编码方法
rs.setEncoding("utf8");//也可以在创建rs的时候传一个utf-8,设置utf8后，如果在设置highWaterMark的最小值是3，如果小于3，则读不出来的；
var str="";

rs.on("data",function(data){
    //是怎么读取的呢？不停的以最快速度，将内容读取到内存中；
    str+=data;
    rs.pause();//暂停出水 停止触发data事件
});
setTimeout(function(){
    rs.resume();//恢复出水，重新恢复触发data事件；这里写着timeout
});
rs.on("end",function(data){
    console.log(str);
});
/*
* pause resume data end error
*
*
*
* */