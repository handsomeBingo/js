var http=require("http"),
    url=require("url"),
    fs=require("fs");
/*fs.writeFileSync("./name.txt",new Buffer("珠峰培训"))//第一个参数是路径，第二个是写入的内容，第三个是编码格式默认utf8(如果你向里面写buffer，他也会给你转化成utf8的字符串)；
//write是覆盖是写入先把原有内容清空再写入，如果文件不存在先创建文件；
fs.writeFile("./name.txt",new Buffer("珠峰培训"),function(){
    //成功后执行回调，
});
//如果想执行追加，即在不清空以前的内容的话有两个方法
/!*原理是：在异步写入的方法中增加一个参数{{flag:"a"}},“a”是append追加的意思，同步也是同理fs.writeFile("./name.txt",new Buffer("珠峰培训"),function(){
 //成功后执行回调，
 });*!/
fs.appendFile();
fs.appendFileSync();*/
/////////////////////////
function copySync(source,target){
    var str=fs.readFileSync(source);
    fs.writeFileSync(target,str);
}
copySync("./name.txt","./name1.txt");
function copy(source,target){
    fs.readFile(source,function(err,data){
        fs.writeFile(target,data);
    })
}
copy("./name.txt","./name2.txt");
//readFile的缺点是不能比内存大的文件，适合文件比较小的文件读取（读到内存中RAM）；
