var http=require("http"),
    url=require("url"),
    fs=require("fs");
//我们会需要判断一些文件的状态，文件是否有更新（是否被修改），文件的出生时间，文件的访问时间；stat可以判断路劲是文件还是文件夹，
console.log(fs.statSync("./name.txt").isFile());
console.log(fs.statSync("./name.txt"));

/*
*   atime: 2016-11-05T09:43:03.029Z,//access time访问的时间
 mtime: 2016-11-05T09:43:03.029Z,// modify time修改时间（更改过但是不一定有修改）
 ctime: 2016-11-05T09:43:03.030Z,//change time（内容一定要发生变化）
 birthtime: 2016-11-05T09:43:03.029Z//创建时间
  }*/
fs.stat("./name.txt",function(stat){

});