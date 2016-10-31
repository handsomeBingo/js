function on(ele, eventType, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(eventType, fn);
        return;
    }
    if (!ele["myEvent" + eventType]) {
        ele["myEvent" + eventType] = [];
        ele.attachEvent("on" + eventType, function (e) {
            run.call(ele);
        });
    }
    var a = ele["myEvent" + eventType];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) {
            return;
        }
    }
    a.push(fn);

}

function run() {
    var e = window.event;
    var a = this["myEvent" + e.type];
    if (a && a.length) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function () {
            e.returnValve = false;
        }
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == "function") {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }

        }
    }

}

function off(ele, eventType, fn) {
    var a = ele["myEvent" + eventType];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                break;
            }
        }
    }
}