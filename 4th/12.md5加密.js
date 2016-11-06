//md5加密算法：摘要算法
//1：不可逆
//2：不管多长的文件，产出的长度是相同的
//3：不同的内容产生的md5肯定不相同,相同内容的md5是相同的
var crypto=require("crypto");//node的加密算法
console.log(crypto.getHashes());
//给123456加密

console.log(crypto.createHash("md5").update("123456").digest("base64"));

//当前文件写了一个console.log()