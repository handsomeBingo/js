/**
 * Created by admin on 2016/9/24.
 */

function EventEmitter() {
}
;
EventEmitter.prototype.on = function (type, fn) {
    if (!this["aEmitter" + type]) {
        this["aEmitter" + type] = [];
    }
    var a = this["aEmitter" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn)return;
    }
    a.push(fn);
};

EventEmitter.prototype.fire = function (type, e) {
    var a = this["aEmitter" + type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
        }
    }

}

EventEmitter.prototype.off = function (type, fn) {
    var a = this["aEmitter" + type];
    if (a && a.length) {
        for (var i = 0; i < a.lenght; i++) {
            if (a[i] == fn) {
                a[i] = null;
                break;
            }
        }
    }
};


function Drag(ele) {
    this.x = this.y = this.mx = this.my = null;
    this.ele = ele;
    this.Down = processThis(this.down, this);
    this.Up = processThis(this.up, this);
    this.Move = processThis(this.move, this);
    on(this.ele, "mousedown", this.Down);
}

Drag.prototype = new EventEmitter();
Drag.prototype.addBorder=function(){
    this.ele.style.border="2px dashed black";
}
Drag.prototype.removeBorder=function(){
    this.ele.style.border="none";
}
Drag.prototype.border=function(){
    this.on("start",this.addBorder);
    this.on("end",this.removeBorder);
}
Drag.prototype.range=function(oRg){
    this.oRg=oRg;
    this.on("moving",this.addRange)
}

Drag.prototype.addRange=function(e){
    var oRg=this.oRg;
    var valX=this.x + (e.pageX - this.mx);
    var valY=this.y + (e.pageY - this.my);
    this.ele.style.left = (valX<oRg.left?oRg.left:valX>oRg.right?oRg.right: valX) + "px";
    this.ele.style.top =  (valY<oRg.top?oRg.top:valY>oRg.bottom?oRg.bottom:valY)+ "px";
}

Drag.prototype.down = function (e) {
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;
    if (this.ele.setCapture) {
        this.ele.setCapture();
        on(this.ele, "mousemove", this.Move);
        on(this.ele, "mouseup", this.Up);
    } else {
        on(document, "mousemove", this.Move);
        on(document, "mouseup", this.Up);
    }
    e.preventDefault();
    this.fire("start", e);
}
Drag.prototype.move = function (e) {
    this.ele.style.left = this.x + (e.pageX - this.mx) + "px";
    this.ele.style.top = this.y + (e.pageY - this.my) + "px";
    this.fire("moving", e);

};
Drag.prototype.up = function (e) {
    if (this.ele.releaseCapture) {
        this.ele.releaseCapture();
        off(this.ele, "mousemove", this.Move);
        off(this.ele, "mouseup", this.Up);
    } else {
        off(document, "mousemove", this.Move);
        off(document, "mouseup", this.Up);
    }
    this.fire("end", e);
};

