/**
 *
 * @param ele给哪个元素绑定事件
 * @param eventType事件类型===>click
 * @param fn 绑定函数
 */
function bind(ele, eventType, fn) {//处理dom2不同的绑定方式的兼容性问题
    if (ele.addEventListener) {//可能是一个函数或者undefined
        ele.addEventListener(eventType, fn, false);
        return;
    }
    //从这里开始代是ie6-8
    var tempFn = function () {//这个临时函数是处理fn中的this的
        fn.call(ele);
    }
    if (!ele["mybind" + eventType]){//这个if判断只在第一次执行一次，在ele身上没有这个自定义属性的时候
        //如果ele.mybind+eventType不存在就创建一个数组
        ele["mybind" + eventType] = [];//mybind这个前缀就是区分原生属性的，自定义属性是用来存放经过包装过后的tempFn，为了区分不同的事件类型，使用不同的数组，所以+eventType
    }
    tempFn.origin = fn;//子啊这个临时的函数身上添加自定义属性用来记录它原来是哪个函数
    for (var i = 0; i < ele["mybind" + eventType].length; i++) {//这个循环是用来处理重复绑定，对于已经存出现在事件池中的事件，就不需要重复绑定，但是我们无法读取事件池，所以只能遍历我们模拟的事件池
        if (ele["mybind" + eventType][i].origin === fn) {//如果满足条件说明曾经绑定过，
            //debugger;
            return;//如果曾经绑定过，1不需要重复绑定，2不需要向事件池中添加
        }
    }
    ele["mybind" + eventType].push(tempFn);//将标记过origin属性的tempFn添加到对应事件类型的数组中，这个数组存在的意义在于移除的时候能找到fn对应的tempFn。
    ele.attachEvent("on" + eventType, tempFn);//fn中的this是window

}

function unbind(ele, eventType, fn) {
    if (ele.removeEventListener) {
        ele.removeListener(eventType, fn, false);
    }
    //for ie6-8
    for (var i = 0; i < ele["mybind" + eventType].length; i++) {
        var cur = ele["mybind" + eventType][i];
        if (cur.origin == fn) {
            ele.detachEvent("on" + eventType, cur);//绑定的时候叫做tempFn
            ele["mybind" + eventType].splice(i, 1);
            break;
        }
    }


}


function on(ele, eventType, fn) {//解决顺序问题
    //on方法只负责将绑定的函数添加到ele的自定义数组中，同时把不同的事件类型绑定的方法防盗不同的数组中
    if (!ele["myevent" + eventType]) {
        ele["myevent" + eventType] = [];
    }
    var a = ele["myevent" + eventType];
    for(var i=0;i< a.length;i++){
        if(a[i]===fn){
            return;
        }
    }
    a.push(fn);
    bind(ele,eventType,run);//把run方法绑定给真正事件发生的时候，将run投入事件池，保证事件被触发的时候run方法可以执行
}

function run(e) {
    //run方法负责执行放到ele的自定义事件数组中的方法，所以放到ele的自定属性中的函数,所以只有run才存在事件对象e，比如click事件发生这个run方法的找到click对应的那个自定义属性click的数组才行
    e = e || window.event;
    var isLowIE= !e.target;//判断这个当前浏览器是否为ie6/7/8
    if(isLowIE){
        e.target= e.srcElement;
        e.pageX= (document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.preventDefault= function(){
            e.returnValue=false;
        }
        e.stopPropagation=function(){
            e.cancelable=true;
        }
    }
    //因函run是要绑定给元素的，所以在run函数中的this就是ele，所以用this代替ele
    var a = this["myevent" + e.type];//this可以换成e.target
    for (var i = 0; i < a.length; i++) {
        var fn = a[i];
        if(typeof a[i]=="function"){
            //由于在函数触发的过程中调用过off方法，使得a数组中掺入了null，因此在执行之前需要判断一下,当是函数再执行，如果是null就删除这一项，同时i--，以避免数组塌陷而漏掉某些函数执行；
            fn.call(this,e);
        }else{
            a.splice(i,1);
            i--;
        }
        //现在fn在run中执行，前面没有谁调用fn，这时候fn的this变成了window，所以需要通过call把fn中this改成触发事件的元素是run中的this，this可以换成e.target,与此同时，原来fn是绑定给ele的，即fn原来在事件池中是可以获取e的，但是现在是将run传进去的，run可以获得e，如果不传给fn，fn就没有e
    }
}

function off(ele,eventType,fn){
    var a=ele["myevent"+eventType];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn){
            a[i]=null;//保证如果函数被触发的过程中，调用了off方法就会有保存着所有函数的数组的塌陷问题，但是现在数组中出现了null，只能在下次循环执行这里的防范的时候判断是不是函数，如果是函数再执行。
            break;//因上面on方法处理过重复问题，所以无需担心因塌陷导致的可能出现的重复问题；
        }

    }
}