/**
 *
 * @param ele给哪个元素绑定事件
 * @param eventType事件类型===>click
 * @param fn 绑定函数
 */
function bind(ele,eventType,fn){//处理dom2不同的绑定方式的兼容性问题
    if(ele.addEventListener){//可能是一个函数或者undefined
        ele.addEventListener(eventType,fn,false);
        return;
    }
    //从这里开始代是ie6-8
    var tempFn=function(){//这个临时函数是处理fn中的this的
      fn.call(ele);
    }
    if(!ele["mybind"+eventType]){//这个if判断只在第一次执行一次，在ele身上没有这个自定义属性的时候
        //如果ele.mybind+eventType不存在就创建一个数组
        ele["mybind"+eventType]=[];//mybind这个前缀就是区分原生属性的，自定义属性是用来存放经过包装过后的tempFn，为了区分不同的事件类型，使用不同的数组，所以+eventType
    }
    tempFn.origin=fn;//子啊这个临时的函数身上添加自定义属性用来记录它原来是哪个函数
    ele["mybind"+eventType].push(tempFn);//将标记过origin属性的tempFn添加到对应事件类型的数组中，这个数组存在的意义在于移除的时候能找到fn对应的tempFn。
    ele.attachEvent("on"+eventType,tempFn);//fn中的this是window

}

function unbind(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeListener(eventType,fn,false);
    }
    //for ie6-8
    for(var i=0;i<ele["mybind"+eventType].length;i++){
        var cur=ele["mybind"+eventType][i];
        if(cur.origin==fn){
            ele.detachEvent("on"+eventType,cur);//绑定的时候叫做tempFn
        }
    }



}