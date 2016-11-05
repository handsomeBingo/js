//同步和异步共存
//异步有回调函数
//fs file system
var http=require("http"),
    url=require("url"),
    fs=require("fs");
//fs.readFile();异步，而且在node中，异步不会阻塞主线程
//fs.readFileSync()；同步
/*同步方法可以用try catch(e)不会异常，而异步不会*/