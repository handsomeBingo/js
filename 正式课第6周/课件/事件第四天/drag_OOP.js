function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
			if(!this["aEvent"+type]){
				this["aEvent"+type]=[];
				}
				var a=this["aEvent"+type];
				for(var i=0; i<a.length; i++){
					if(a[i]==fn){
						return this;
						}
					}
					a.push(fn);
					return this;
}
EventEmitter.prototype.fire=function(type,e){
			var a=this["aEvent"+type];
			for(var i=0; i<a.length; i++){
				if(typeof a[i]=='function'){
					a[i].call(this,e);
				}else{
						a.splice(i,1);
						i--;
				}
			}

		}
					
EventEmitter.prototype.off=function(type,fn){
    var a = this['aEvent' +type];
	if (a && a.length) {
		for(var i = 0; i < a.length; i++){
		    if (a[i]==fn) {
			    a[i] = null;
				break;	
		    }
	    }
	}
	return this;
	
}
//第二步：面向对象的拖拽，Drag类
	
	//console.log(Math.ceil(Math.random()*6));

function Drag(ele){
	this.x=this.y=this.mx=this.my=null;
	this.ele=ele;
	this.DOWN=processThis(this.down,this);
	on(this.ele,"mousedown",this.DOWN);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
}
Drag.prototype=new EventEmitter;
//on,fire,off  ----事件标识符（事件类型）
	Drag.prototype.down=function(e){
		this.x=this.ele.offsetLeft;
		this.y=this.ele.offsetTop;
		this.mx=e.pageX;
		this.my=e.pageY;
		if(this.ele.setCapture){
				this.ele.setCapture();
				on(this.ele,'mousemove',this.MOVE);
				on(this.ele,'mouseup',this.UP);
			}else{
					on(document,'mousemove',this.MOVE);
					on(document,'mouseup',this.UP);
				}
			e.preventDefault();
			//this.fire("rose",e);
			this.fire("dragstart",e);
		}
		
		Drag.prototype.move=function(e){
			this.ele.style.left=this.x+(e.pageX-this.mx)+'px';
			this.ele.style.top=this.y+(e.pageY-this.my)+'px';
			//this.fire("moving",e);
			this.fire("dragging",e);
		}
		Drag.prototype.up = function (e){
			if(this.ele.releaseCapture){
				off(this.ele,"mousemove",this.MOVE);
				off(this.ele,"mouseup",this.UP);
				this.ele.releaseCapture();
			}else{
				off(document,"mousemove",this.MOVE);
				off(document,"mouseup",this.UP);
			}
			//this.fire("abcd",e);//给up方法发布了一个"end"事件，
			this.fire("dragend",e);
		}
		
Drag.prototype.range=function(oRange){
	this.oRange=oRange;//相当于用这种方式给this.addRange传了一个参数。
	this.on("dragging",this.addRange);//由于this.addRange是绑定到事件上的方法，所以没法传参数，所以只能在外边再套一个方法实现把参数传进来并且保存在实例的属性上。并且用事件绑定的方式，达到了拖拽进行的时候执行this.addRange。
}
Drag.prototype.addRange=function (e){
		//var oRange={left:100,top:0,right:500,bottom:400}
		var oRange=this.oRange;
		var valX=this.x+(e.pageX-this.mx);
		var valY=this.y+(e.pageY-this.my);
		if(valX>=oRange.right){
			valX=oRange.right;	
		}else if(valX<=oRange.left){
			valX=oRange.left;
		}
		this.ele.style.left=valX+"px";
		
		if(valY>=oRange.bottom){
			valY=oRange.bottom;
		}else if(valY<=oRange.top){
			valY=oRange.top;
		}
		this.ele.style.top=valY+"px";
}

Drag.prototype.addBorder=function(){
	this.ele.style.border="2px dashed #ccc";	
}
Drag.prototype.removeBoder=function(){
	this.ele.style.border="none";
}
Drag.prototype.border=function(){
	this.on("dragstart",this.addBorder);
	this.on("dragend",this.removeBorder);	
}