var http=require("http"),
    url=require("url"),
    fs=require("fs");
//如果文件不存在则创建文件，默认写入为utf-8格式
var ws=fs.createWriteStream("./path2.txt");//ws是可写流对象，也有highWaterMark值，单次最大写入的字节，默认值最大值是16K；按理说应该是无法写入了，就不要去再读了，等写完了再去读
//ws为可写流对象,有两个方法 write end方法ws.
//write方法有返回值，是个布尔值，true是表示还可以继续写入，false是不可写入了
var flag=ws.write("珠峰培训1111",function(){//write方法的第一个参数是字符串或者buffer
    //当写完后执行这个方法
    console.log("ok");
});
console.log(flag);
ws.end("3",function(){
   //一旦调用end方法，则将以前那些堆积的没来得及写入的和从end传入的，以最快的速度都写入了，然后关闭文件，只要调用end方法后，就不能再写入了；
   // 写完后触发该回调函数
});

