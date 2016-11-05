//node给我们提供了一个自带的事件模块（核心模块）
var EventEmitter=require("events");
var event=new EventEmitter;
function eat(w){
    console.log(w+" am hungry");
}

event.once("hungry",eat);//单次绑定执行的方法，只需要这个方法执行一次，执行过后再次执行没有效果
event.on("hungry",eat);//绑定多次执行的方法；只要不移除随时可以触发,node中可以重复绑定，但是绑的超过10个就会警告，once也可以重复绑定；
event.emit("hungry","I");//触发事件
event.removeListener("hungry",eat);//移除我们绑定的事件
event.removeAllListeners("hungry",eat);//移除我们绑定的所有事件
