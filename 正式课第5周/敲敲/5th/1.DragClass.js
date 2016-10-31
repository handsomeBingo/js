/*
* 1、思想转变：由面向过程（单纯的实现效果，不考虑复用）编程转遍为面向对象（相同的方法实现共用，就是把要操作的对象当作一类来处理）
* 2、类和实例的概念，实例身上存储的都是私有可能要操作的属性（包含元素和值）
* 3、构造函数的封装，把方法都定义在原型上，对于拖拽来说，mousedown，mousemove，mouseup等方法是所有拖拽元素都要用的，所以应该是公有的方法
* 4、公有方法和函数，（mousemove方法等），把实例上的私有属性，比如：this.element就是要拖拽的那个元素，也就是公有方法要操作的那个元素，实例就是起到了保活和媒介的作用，技能调用公有方法又能获取私有属性
* 5、一定要处理好this的问题，因为这个this才是实力，也只有this才有要操作的元素
*
*
* */
function Drag(ele){
    this.element=ele;
    //将要拖拽的元素保存成实例的私有属性，在公有的方法中的this'是实例，那么就能通过this就能找到this.element，这样在公有的方法中即可获取到要拖拽的元素
    this.x=null;
    this.y=null;
    //this.x/y只有在点击事件发生的时候通过e.clientX/Y才能计算，这回还没有鼠标down事件，所以先设置为null，呆一会点击后再重新赋值
    //给鼠标绑定onmousedowm事件是操作元素必须要的事件，所以可以防盗构造函数中
    var that=this;//this是当前实例
    this.Down=function(e){
        //事件触发的时候，浏览器会把事件对象e传给Down，但是真正需要e的是down，设置这个Down有两个作用，首要作用是将down的this改回ele，其次就是通过形参的形式将事件发生的时候的事件对象e传给down（柯里化函数思想）；在这里并不需要处理e的兼容性方法，on方法中已经处理过
        that.down.call(that,e);
    }
    this.Move=function(e){
        that.move.call(that,e);
    }
    this.Up=function(e){
        that.up.call(that,e)
    }
    on(this.element,"mousedown",this.Down);
    //如果这里直接写this.down，那么当事件被触发的时候，原型上的down方法中的this就变成了this.element了，而不是实例了，为了保证公有方法中this是当前类的实例，需要人为处理，并且在up方法中还要移除，就就意味着公有方法能找到这个方法，所以要保存到实例身上，同理处理move和up
}

//三个公有的函数，必须保证公有方法中的this是实例
Drag.prototype.down=function down(e){
    this.x= e.clientX-this.ele.offsetLeft;
    //鼠标相对于传进来的ele的相对偏移量，这里没有滚动条，当有滚动条的时候，就得使用pageX，因为offsetLeft这时候是到body的距离了；
    this.y= e.clientY-this.element.offsetTop;

    //判断setCapture()是不是存在，如果有，事件绑定给ele，如果不幸，再绑定给document
    if(this.element.setCapture){
        this.element.setCapture();
        on(this.element,"mousemove",this.Move);
        on(this.element,"mouseup",this.Up);
    }else{
        on(document,"mousemove",this.Move);
        on(document,"mouseup",this.Up);
    }
    e.preventDefault();//组织默认行为，盒子里有图片就会有默认粘连的行为
}

Drag.prototype.move=function(e){
    //this.element才是我要脱宅也就是我们要操作的那个元素，this.x/y就是保存着相对偏移量的值，我们把这个值讯在实例的私有属性上
    this.element.style.left= e.clientX-this.x;
    this.element.style.top= e.clientY-this.y;
}

Drag.prototype.up=function(e){
    if(this.element.releaseCapture){
        //for ie+fireFox
        this.element.releaseCapture();
        off(this.element,"mousemove",this.Move);
        off(this.element,"mouseup",this.Up);
    }else{
        off(document,"mousemove",this.Move);
        off(document,"mouseup",this.Up);
    }
}