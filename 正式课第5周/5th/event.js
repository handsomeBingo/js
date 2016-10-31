function on(ele, eventType, fn) {//负责挖程序池，并且把需要绑定的方法保存懂啊程序池中
    if (ele.addEventListener) {
        ele.addEventListener(eventType, fn, false);
        return;
    }
    //for ie8-
    if (!ele["aEvent" + eventType]) {
        ele["aEvent" + eventType] = [];
        ele.attachEvent("on" + eventType, function (e) {
            run.call(ele);
        })

    };
    var a = ele["aEvent" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) {
            return;
        }
    }
    a.push(fn);
    //用来触发run执行的代码,不再使用bind方法来解决被绑定的方法的this，关键字的指向问


}

function run() {//负责找到程序池，然后执行这个数组里的所有的相关方法
    var e = window.event;
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        e.preventDefault = function () {
            e.returnValue = false;
        }
    }

    var a = this["aEvent" + e.type];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == "function") {
                a[i].call(this, e);//如果不call,a[i],中的this是数组a,a[i]()等效于a.i();
            } else {
                a.splice(i, 1);
                i--;
            }

        }
    }

}

function off(ele, eventType, fn) {//负责对吧对应的方法重程序池里移除
    var a = ele["aEvent" + eventType];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                break;
            }
        }
    }
}