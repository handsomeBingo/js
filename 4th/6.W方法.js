var http=require("http"),
    url=require("url"),
    fs=require("fs");
var ws=fs.createWriteStream("./path2.txt",{highWaterMark:1});



//写一个方法，写入10个数字，每次写一个；
var index=0;
var i=0;
function W(){
    //最大不能超过10，且flag不能超过10
    var flag=true;
    while (flag&&index<10){
        flag=ws.write(""+index++);//这可flag之所以会变成false，是因为上面设置了highWaterMark,这个值纪录着当前单次能够写入的最大字节长度，当超过这个值之后，flag就会变成false，当drain后
    }
}
W();
ws.on("drain",function(){

    W();
});
console.log(123);