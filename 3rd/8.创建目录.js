var http=require("http"),
    url=require("url"),
    fs=require("fs");
/*
fs.mkdir();//异步
fs.mkdirSync()//同步
*/
//在创建文件夹的时候，必须保证上一级文件夹存在才能再去创建下一级
function makepSync(src){
    //先创建a在创建b再创建c再创建d

    var ary=src.split("/");
    for(var i=0,len=ary.length;i<len;i++){
        var path=ary.slice(0,i+1).join("/");
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
}
//makepSync("a/b/c/d");
function makep(src){
    var ary=src.split("/");
    for(var i=0,len=ary.length;i<len;i++){
        var path=ary.slice(0,i+1).join("/");
            fs.mkdir(path);
    }
}
makep("a/b/c/d");
/////////////////////
/*fs.existsSync("a");//同步判断文件夹是不是存在，
fs.existsSync("a",function(exists){
   //这个方法没有err参数
    console.log(exists);
});*/
