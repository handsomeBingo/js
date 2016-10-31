function on(ele,eventType,fn){
    if(ele.addEventListener){
        ele.addEventListener(eventType,fn);
    }
    //for ie6-8
    if(!ele["myEvent"+eventType]){
        ele["myEvent"+eventType]=[];
        ele.attachEvent("on"+eventType,function(){
            run.call(ele,e);
        })
    }
    var a=ele["myEvent"+eventType];
    for(var i=0;i< a.length;i++){
        if(a[i]===fn){
            return;
        }
    }
    a.push(fn);
}

function off(ele,eventType,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(eventType,fn);
    }
    //for ie 6-8
    var a=ele["myEvent"+eventType];
    if(a){
        for(var i=0; i< a.length;i++){
            if(a[i]===fn){
                ele["myEvent"+eventType][i]=null;
                break;
            }
        }
    }


}

function run(e){
    e=e||window.event;//这里也可以不传参，直接在这里面定义一个私有变量，var e=window,之所以留着e,是为标准浏览器用这一套方法时留的，因为这套方法如果只有ie8-用，e从参数传不进来，因为ie8-下的事件对象不是这么获取的，ie8-的事件对象是定义在window下的一个属性；
    var a=this["myEvent"+ e.type];
    if(a){
        //只要这个条件成立的时候说明已经是ie低版本了，因为如果不是ie低版本，根本不会去创建这么一个数组，这个数组实在上面on方法中创建的，创建的前提就是当前浏览器为低版本的ie
        e.target= e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientx;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.stopPropagation=function(){
            e.cancelable=true;
        }
        e.preventDefault=function(){
            e.returnValve=false;
        }

        for(var i=0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
