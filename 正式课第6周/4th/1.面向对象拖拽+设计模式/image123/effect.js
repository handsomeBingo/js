/**
 * Created by admin on 2016/9/24.
 *//*改this的原则，当方法是直接操作dom元素，属性是直接设置给dom元素时，必须将this的指向改成dom元素，存储值的this就不需要改了*/
function clearEffect(){
    clearTimeout(this.flyTimer);//定义在Drag类的实例上，比定义在DOM上更安全，因为dom元素是内置的，本身就有很多的属性和方法，很容易和自定义的冲突；
    clearTimeout(this.dropTimer)
}
function getSpeed(e){//里有一个e，这个事件对象是如何传到这个方法里的
    if(this.prevPosi){//如果有上一次的位置，说明这已经不是第一次
        this.speed=e.pageX-this.prevPosi;
        this.prevPosi=e.pageX;//不断的更新“上一次的位置”,确保“上一次的位置”总是最近一次的。

    }else{
        this.prevPosi=e.pageX;//如果没有上一次的位置，则把当前的位置赋值给“上一次的位置”
    }
}
function fly(){
    this.speed*=.98;
    var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;//得到最大的右边界
    var currentX=this.ele.offsetLeft+this.speed;//正常运动时，盒子应该到达的位置
    if(currentX<=0){//左边界判断,如果越过了左界
        this.ele.style.left=0;//则停在左边界上
        this.speed*=-1;//调个头，撞到边界向反方向运动
    }else if(currentX>=maxRight){
        this.ele.style.left=maxRight+"px";
        this.speed*=-1;
    }else{
        //console.log(this);
        this.ele.style.left=currentX+"px";
    }
    //var that=this;
    //this.flyTimer=setTimeout(function(){fly.call(that)},20);
    if(Math.abs(this.speed)>=.5){
        this.flyTimer=setTimeout(processThis(fly,this),20);
    }

}
function drop(){
    if(this.dropSpeed){
        this.dropSpeed+=9;
    }else{
        this.dropSpeed=9;
    }
    this.dropSpeed*=.98
    var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    var currentY=this.ele.offsetTop+this.dropSpeed;
    if(currentY>=maxBottom){
        this.ele.style.top=maxBottom+"px";
        this.dropSpeed*=-1;
        this.flag++;//标识属性，用来记录连续多少次到达了边界的属性
    }else{
        this.ele.style.top=currentY+"px";
        this.flag=0;
    }
    if(this.flag<2){//这是个很有趣的技巧
        this.dropTimer=setTimeout(processThis(drop,this),20);
    }
}
