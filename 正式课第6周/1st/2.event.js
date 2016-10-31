function bind(ele, eventType, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(eventType, fn);
        return;
    }
    if (!ele["myBind" + eventType]) {
        ele["myBind" + eventType] = [];
    }
    var a = ele["myBind" + eventType];
    var temp = function () {
        fn.call(ele);
    }
    temp.origin = fn;
    for (var i = 0; i < a.length; i++) {
        if (a[i].origin == fn) {
            return;
        }
    }
    ele.attachEvent(eventType, temp);
}

function unbind(ele, eventType, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(eventType, fn);
    }
    var a = ele["myBind" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i].origin == fn) {
            a.splice(i, 1);
            ele.detachEvent("on" + eventType, fn);
            break;
        }
    }
}

function on(ele, eventType, fn) {
    if (!ele["myEvent" + eventType]) {
        ele["myEvent" + eventType] = [];
    }
    var a = ele["myEvent" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) {
            return;
        }
    }
    a.push(fn);
    bind(ele, eventType, run);
}

function run(e) {
    e = window.event;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) - e.clientY;
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) - e.clientX;
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
    e.preventDefault = function () {
        e.returnValue = false;
    }
    var a = this["myEvent" + e.type];

    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
    }


}

function off(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn);
        return;
    }
    var a=ele["myEvent" + eventType];
    for(var i=0;i< a.length;i++){
        if(a[i]=="fn"){
            a[i]=null;
            break;
        }
    }
}