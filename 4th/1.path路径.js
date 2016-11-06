var path=require("path");

//获取不带后缀的文件名
path.basename("path.txt",".txt");//两个参数：第一个是含拓展名的路径，第二个为拓展名，返回值是不带拓展名的文件名
path.extname("path.txt");//只有一个参数，路径，默认最后一个点后面的内容为拓展名，返回值拓展名

//1、连接路径

var str="a/b/c/";
var str2="a/b/c/d/1";
path.join(str,str2);//参数是要拼接的路径
//及当前路径解析一个绝对路径，__dirname,(node闭包机制的一个形参)；
// join 方法支持../表示上一级，
//2.解析路径的方法
path.resolve("path.txt");//根据所传路径解析一个绝对路径，支持../，返回值是解析完的路径地址
/**
 * basename
 * extname
 * join
 * resolve
 * */
