function bind(ele, eventType, fn) {//绑定tempFn和处理this
    if (ele.addEventListener) {
        ele.addEventListener(eventType, fn);
        return;
    }
    var tempFn = function () {
        fn.call(ele);
    }
    tempFn.origin = fn;
    if (!ele["mybind" + eventType]) {
        ele["mybind" + eventType] = [];
    }
    var a = ele["mybind" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i].origin === fn) {
            return;
        }
    }
    a.push(tempFn);
    ele.attachEvent("on" + eventType, tempFn);
}

function unbind(ele, eventType, fn) {//负责移除的
    if (ele.removeEventListener) {
        ele.removeEventListener(eventType, fn);
    }
    var a = ele["mybind" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i].origin === fn) {
            ele.detachEvent("on" + eventType, fn);
            ele["mybing" + eventType].splice(i, 1);
            break;
        }
    }

}

function on(ele, eventType, fn) {//把run方法绑定给
    if (!ele["myEvent" + eventType]) {
        ele["myEvent" + eventType] = [];
    }
    var a = ele["myEvent" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return;
        }
    }
    a.push(fn);
    bind(ele, eventType, run);
}

function run(e) {
    //run方法负责执行放到ele的自定义事件数组中的方法，所以放到ele的自定义属性中的函数，所以只有run才存在事件对象e，比如click事件发生这个run方法得找到click对应的那个自定义属性click的数组才行
    e = e || window.event;
    var isLowIE = !e.target;
    if (isLowIE) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.stopPropagation = function () {
            e.returnValue = false;
        }
        e.preventDefault = function () {
            e.cancelBubble = true;
        }
    }
    //因函数run是要绑定给元素的，所以在run函数中的this就是ele，所以要用this替换ele
    var a = this["myEvent" + e.type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
        //现在fn在run中执行，前面没有谁调用fn，这时候fn的this变成了window，所以需要通过call把fn中的this改成触发事件的元素，而这个触发事件的元素又是run中的this，this可以替换成e.target,于此同时，原来的fn是绑定给ele，即原来在事件池中fn是可以获取事件对象e的，但是现在是将run传进去的，run可以获得事件对象e；如果不传给fn，fn就没有e
    }
}

function off(ele,eventType,fn){
    var a=ele["myEvent"+eventType];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn){
            a[i]=null;//保证如果函数被触发的过程中，调用了off方法，就会有保存着所有函数的数组塌陷问题，为了避免这事，我们不删除了，而是将欲移除的函数赋值为null；但是如此一来，数组中将会出现null，所以在下一次执行的时候需要先判断，如果是函数，再去执行
            break;//因上面on方法处理过重复问题，所以无需担心因塌陷导致的可能出现的重复问题
        }
    }
}