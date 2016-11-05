function EventEmitter(){
    this._events={};
}
EventEmitter.prototype.on=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else {
        this._events[eventName]=[callback];
    }
};
EventEmitter.prototype.once=function(eventName,callback){
  //执行emit的时候触发callback，执行后移除callback；
    function one(){
        //当绑定的行数为one函数，执行one函数后将one移除
        callback.apply(this,arguments);
        this.removeListener(eventName,one);
    };
    one.callback=callback;//通过自定义属性，然后再移除的时候我们通过自定义属性找到callback移除掉
    this.on(eventName,one);
};

EventEmitter.prototype.emit=function(eventName){
   var args= [].slice.call(arguments,1);
    this._events[eventName].forEach((item)=>{
        item.apply(this,args);
    });
};
EventEmitter.prototype.removeListener=function(eventName,callback){
    this._events[eventName]=this._events[eventName].filter((item)=>{
       return item!=callback&&item.callback!=callback;
    });
};
var event=new EventEmitter();
function eat(who){
    console.log(who+"吃饭");
}
event.once("吃饭",eat);//调用once函数，内部绑定的是one方法，one方法中装的是eat函数执行，因为one方法只执行一次，
//event.on("吃饭",eat);
//event.removeListener("吃饭",eat);
event.emit("吃饭","我");
event.emit("吃饭","我");
event.emit("吃饭","我");
event.emit("吃饭","我");
