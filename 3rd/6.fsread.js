var http=require("http"),
    url=require("url"),
    fs=require("fs");
var per={};
fs.readFile("./name.txt","utf8",function(err,data){
    per.name=data;
});
fs.readFile("./age.txt","utf8",function(err,data){
    per.age=data;
});
。。。。。。。。。。。。。。。。。。。。。。。。