//创建一个可读流和可写流
//1.每次读入一次后开始写入 在on.("data")中调用write方法
//2.当文件不能写入时 暂停读取 如果ws.write返回false调用resume
//3.等待抽干后再调用恢复方法，恢复读取，在drain方法中调用resume
//4.监听读取后关闭写入方法（ws.end方法） rs.on("end") 中关闭ws.end
var http=require("http"),
    url=require("url"),
    fs=require("fs");
function copy(source,target){
    var rs=fs.createReadStream(source),
        ws=fs.createWriteStream(target);
    rs.pipe(ws);


}
copy("./path.txt","path3.txt");