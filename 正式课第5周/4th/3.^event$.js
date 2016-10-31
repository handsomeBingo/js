function on(ele, eventType, fn) {//负责添加
    if (ele.addEventListener) {
        ele.addEventListener(eventType, fn);
        return;
    }
    //for isie6-8
    if (!ele["myEvent" + eventType]) {//因为run和自定义数组相同，都是只出现一次的，所以在这里绑定run
        ele["myEvent" + eventType] = [];
        ele.attachEvent("on" + eventType, function () {
            run.call(ele);//处理run中this为ele；
        })

    }
    var a = ele["myEvent" + eventType];
    for (var i = 0; i < a.length; i++) {//排除重复绑定的问题
        if (a[i] === fn) {
            return;
        }
    }
    a.push(fn);
}


function off(ele, eventType, fn) {//负责移除
    if (ele.removeEventListener) {
        ele.removeEventListener(eventType, fn)
    }
    //for id6-8
    var a = ele["myEvent" + eventType];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                ele["myEvent"+eventType][i]=null;
                break;
            }
        }
    }


}


function run(e) {//找到数组且按照数组执行
    e =window.event;
    var a = this["myEvent" + e.type];//this在on方法中已经通过call处理好了
    if (a) {//只要这个条件成立的时候说明已经是ie低版本，因为如果不是ie低版本，根本不会去创建这么一个数组

        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.stopPropagation= function(){
            e.cancelBubble=true;
        }
        e.preventDefault=function(){
            e.returnValue=false;
        }//以上代码处理兼容性问题，在一下的代码中就可以使用和标准浏览器同样的代码了

        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);//这里的a[i]才是fn，也就是说是最后实现效果的函数，这里面才是真正需要事件对象e的，不管前面的run有没有，但是这个a[i]必须要有e，但是ie中是不兼容e的，所以在on方法中如果不处理e，直接传，而且在run中也不处理，on传给run一个undefined，因为ie的e是window.event，所以可以在run中处理，也可以在on中处理，并在call的同时传进来。但是on方法中并没有设置e这个形参，如果一定要在on中搞，就得搞一个变量，还不如咋run中设一个形参好
            }else{
                a.splice(i,1);
                i--;
            }
        }


    }


}