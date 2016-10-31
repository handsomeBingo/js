/*
 *1、思想转变：由面向过程（单纯的实现效果，不考虑复用）编程转变为面向对象（相同的方法实现共用，就是把要操作的对象当作一类来处理，），
 * 2、类和实例的概念，实例身上存储的都是私有可能要操作的属性（包含元素和值），
 * 3、构造函数的封装，把方法都定义在原型上，对于拖拽来说，mousedown，mousemove，mouseup等方法是所有拖拽元素都要用的，所以应该是公有的方法
 * 4、公有方法和函数，（mousemouve）方法，把实例上的私有属性 比如：this.element就是要拖拽的那个元素，也就是公有方法要操作的那个元素，实例就是起到了保存和媒介的作用，既能调用公有方法又能获取私有属性，
 * 5、一定要处理好this的问题，因为这个this才是实例，也只有实例才有要操作的元素。
 *
 *
 *
 * */
function Drag(ele) {
    this.element = ele;//将要拖拽的元素保存到实例的私有属性，在公有方法中的this是实例，那么就能通过this就能通过this.element获取到要拖拽的元素
    this.x = null;
    this.y = null;//this.x和this.y只有在点击时通过e.clientX/Y才能计算，这会儿还没鼠标down事件，所以先设置为null，待一会儿点击后再重新赋值
    //给鼠标绑定onmousedown事件是必须要操作的事件，所以可以放到构造函数中，
    var that = this;//this是实例
    this.Down = function (e) {//事件触发的时候，浏览器会把事件对象e传给Down，但是真正需要e的是down，所以在Down设置形参e，目的是保存这个变量，将来传给真正有需求的down，这里不需要做兼容性处理，因on方法中处理过
        that.down.call(that, e);
    };
    this.Move = function (e) {
        that.move.call(that, e)
    };
    this.Up = function (e) {
        that.up.call(that, e)
    }
    on(this.element, "mousedown", this.Down)//如果这里直接写this.dowm，那么当事件被触发的时候，原型上的down方法中的this就变成了this.element了，而不是实例了，为保证公有方法中的this是当前类的实例需要人为处理，并且在up方法中还要移除，就意味着公有方法能找到这个方法，所以需要保存到实例身上,同理处理move和up
}

//三个公有函数,必须保证公有方法中的this'是实例
Drag.prototype.down = function down(e) {
    this.x= e.clientX-this.element.offsetLeft;//给鼠标相对于传进来的ele的相对偏移量，这里没有滚动条，使用pageX也是一样的
    this.y= e.clientY-this.element.offsetTop;
    //判断一下setCapture()是不是有，如果有事件绑定给element，如果不行再绑定给document
    if(this.element.setCapture){//ie+firefox
        this.element.setCapture();
        on(this.element,"mousemove",this.Move);//
        on(this.element,"mouseup",this.Up);//因绑定事件会改变this，所以我们用Move和Up

    }else{//需要把事件绑定给document
        on(document,"mousemove",this.Move);
        on(document,"mouseup",this.Up);
    }
    e.preventDefault();//阻止默认行为，盒子里有图片就会有默认粘连的行为
};

Drag.prototype.move = function move(e) {
    //this.element才是我要拖拽也就是我要操作的那个元素，this.x/y就是保存着那个相对偏移量的值，我们把这个值攒在实例的私有属性上
    this.element.style.left=e.clientX-this.x +"px";
    this.element.style.top= e.clientY-this.y+"px"
};
Drag.prototype.up = function up() {
    //由于绑定时是分开绑定的，所以移除的时候也要分开移除
    if(this.element.releaseCapture){//ie+firefox
        this.element.releaseCapture();
        off(this.element,"mousemove",this.Move);
        off(this.element,"mouseup",this.Up);//因为这些方法都是保存在实例的私有属性上
    }else{
        off(document,"mousemove",this.Move);
        off(document,"mouseup",this.Up);//
    }

};