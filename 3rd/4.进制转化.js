//任意进制转换为十进制parseInt();
console.log(parseInt("11",2,10));
//将任意进制转化成任意其他进制，/().toString();前面括号中放要转化的数字，后面换要转化成的进制
console.log((10).toString(2));//将10转化成2进制
console.log((0xff).toString());
//*/*/*/*/*/*/*/*/*/*/*/*/**/*/*/*/*/*/
//base64 编码格式 不是加密 md5 sha1 sha256是加密的；是将内容转换成可见内容A-Z，a-z,0-9,+/一共64个字符
//将2进制的取值范围限制在64之内，2^6-1，一个汉字由3个字节组成，每个字节减小到64以下，在可见编码下取值即可；
//1：将16进制转化成2进制
// e7 8f a0
console.log((0xe7).toString(2));
console.log((0x8f).toString(2));;
console.log((0xa0).toString(2));;

//2.将三个8位的字节变成4个 6位的字节
function base64(str){
    //1.先将buffer里的每一个字节都转化成2进制，拼接到一起
    //2.将这个拼接好的内容每6位分开，前面+两个0；
    //3.转化成10进制
    //去可见编码中取值
    var buffer=new Buffer(str);
    var str2="";
    for(var i=0;i<buffer.length;i++){
        str2+=(buffer[i]).toString(2);
    }
    str2=str2.replace(/\d{6}/g,(item,index)=>{
        console.log('1',item);
            return "00"+item;
    });
    var ary=str2.match(/\d{8}/g)
    ary=ary.map((item)=>{
      return parseInt(item,2,10);
    });
    var str3="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str4="";
    ary.map((item)=>{
        return str4+=str3[item];
    });
    return str4;
};

console.log(base64("珠"));