//流的文章https://zhufengnodejs.github.io/doc/html/node%E5%9F%BA%E7%A1%80/%E6%B5%81.html
//流失从上到下，始终是一个
var http=require("http"),
    url=require("url"),
    fs=require("fs");
//创建一个可读流
var rs=fs.createReadStream("path.txt",{highWaterMark:1,start:3,end:5});//参数两个：第一个是路径，第二个可选，是一个对象，不写有默认值；返回值不是读取到的数据，而是一个可读流的对象，rs(readstream);
//相当于在家里安装了一个水管，默认是非流动模式，要想有水，我们得将水管打开，这里我们监听一个on data事件，fs会以最快的速度不停的发射emit data事件,默认encoding是null，读回来的是buffer
//highWaterMark:最高水位线，即每次读取的最大内存，可以设置，写在fs.createReadStream的第二个参数中{highWaterMark:1（个字节）,start(数组字节起始索引):3,end(结束索引):5}；注意起始和结束时索引，包前又包后；
var buf=new Buffer(3);
var ary=[];
var i=1;
//监听读取进行中事件,这就是相当于开始了
rs.on("data",function(data){
    //读取时异步的方法，因为有回调函数
    //这个data是buffer的，想转化成字符串，用toString,这个回调函数执行多少次取决于data能读取几次，读取几次就执行几次；
    ary.push(data);
    console.log(i++);

});

//监听结束事件
rs.on("end",function(data){
    console.log(Buffer.concat(ary).toString());
});
//监听错误事件
rs.on("error",function(err){
   //如果读取失败则会触发这个事件；
});

