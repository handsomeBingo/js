/*var buffer=new Buffer(6);
//buffer.fill()//这个方法是给buffer填充的；
console.log(buffer);

var buffer=new Buffer([1,2,3]);//这里每个数字最大是255，当超过256的时候，对256去模，负的加256，不识别的均为0；
console.log(buffer);

//buffer和字符串的区别
var buffer=new Buffer("珠峰","utf-8");
console.log(buffer);//在utf-8中一个汉字3个字节//可以调用buffer.toString()方法转化成汉字
console.log(buffer.length);//buffer的length是buffer字节的长度

//buffer和数组的区别 和数组都有一个slice方法；
var arr=[1,2,3];
var arr1=arr.slice(0,1);
arr1[0]=100;
console.log(arr);
////////////////////////////
var a=[100];
var arr=[a,2,3];
var newA=arr.slice(0);
a[0]=200;
console.log(newA);//[[200],2,3];

var buffer=new Buffer([1,2,3]);
var newBuffer=buffer.slice(0,1);//buffer的buffer仍然操作的是原来的buffer；而数组是克隆一个和原来一样的
newBuffer[0]=100;
console.log(newBuffer);//因为buffer是16进制的，100*16=6....4 16*4=64 所以第一个是64

/////////////////////////////////////////////
/!*write方法*!/
var buffer=new Buffer(12);
//string当前欲写入的字符串, offset；偏移量, length写入长度：这个长度是utf8的字节数, encoding编码格式
buffer.write("珠峰",0,6,"utf-8");//偏移量是包前不包后，即偏移量写0，就是从0开始的，
buffer.write("排序",6,6,"utf-8");
console.log(buffer.toString());

/!*copy方法：将n个小buffer粘贴到大buffer上*!/
var buffer=new Buffer(6);
var buf1=new Buffer("柱");
var buf2=new Buffer("风");
//targetBuffer(目标buffer),
// targetStart(目标开始), 
// sourceStart(源的开始), 
// sourceEnd(源结束)
buf1.copy(buffer,0,0,3);
buf2.copy(buffer,3,0,3);
console.log(buffer.toString());

var buffer=new Buffer(12);
var buf1=new Buffer("珠峰培");
var buf2=new Buffer("训");
buf1.copy(buffer,0,0,9);
buf2.copy(buffer,9,0,3);
console.log(buffer.toString());
/!*concat将多个小内存拼成一个大buffer*!/
var buf1=new Buffer("珠峰培");
var buf2=new Buffer("训");
var newB=Buffer.concat([buf1,buf2]);
//自己写一个concat方法，是否传入长度，如果长度过大，则留取有效的长度即可；用到了slice方法，从copy方法，
/!*Buffer.myConcat=function(list,tlength){
    //获取buf1和buf2，将两个buffer粘贴到大buffer（根据长度构建buffer），截取有效的buffer返回
    if(typeof tlength=="undefined"){//这里需要考虑为0的时候，如果只写一个
        var bigBuf=new Buffer(tlength);
    }
    var tl=0;
    list.forEach((item,index)=>{
        item.copy(bigBuf,tl,item.lenght);
        tl+=item.length;
    });
    if(tlength>tl){
        bigBuf
    }
    return bigBuf;
}*!/*/
var buf1=new Buffer("珠峰培");
var buf2=new Buffer("训");
Buffer.myConcat=function(list,tlength){
    //获取buf1和buf2，将两个buffer粘贴到大buffer（根据长度构建buffer），截取有效的buffer返回
    if(typeof tlength=="undefined"){//这里需要考虑为0的时候，如果只写一个
        tlength=0;
        list.forEach((item,index)=>{
            tlength+=item.length;
        });
        var bigBuf=new Buffer(tlength);
        //接下来是将每一个小buffer copy到大Bigbuff上
        var tl=0;
        list.forEach((item)=>{
           item.copy(bigBuf,tl);
            tl+=item.length;
        });
    }
    return bigBuf.slice(0,tl);
};

console.log(Buffer.myConcat([buf1,buf2]).toString());

///////////
/*isBuffer()*/
//有的参数要传递buffer，判断是否是buffer，是则返回true，不是则返回false