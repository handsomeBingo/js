var http=require("http"),
    url=require("url"),
    fs=require("fs");
var ws=fs.createWriteStream("./path2.txt",{highWaterMark:1});
ws.write("1");
ws.on("drain",function(){
    console.log("ok, go on");
    ws.write("2");
    ws.end();//如果不写这行代码的话就是死循环，因为写入1后，触发drain方法，写入2后还会触发drain方法，继续写入2，然后2写完了又触发drain，再写入2，就死了
});
