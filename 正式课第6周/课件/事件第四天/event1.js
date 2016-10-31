function on(ele,type,fn){//负责挖程序池，并且把需要绑定的方法保存到程序池里
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return ;
	}
	//document.documentElement.clientWidth||document
	//面向对象的语言，都有一个说法：万物皆对象。
	//以下是IE的解决方案
	//encodeURI
	//ECMA 
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];	
		ele.attachEvent("on"+type,function(){run.call(ele)});
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
	
}

function fn(e){
	
}

function run(e){//负责找到对应的程序池，然后遍历执行这个数组里的所有的相关方法

	var e=e||window.event;
	var type=e.type;
	if(!e.target){
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;};	
	}
	var a=this["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);//用call来执行a数组里的每个方法，是为了让数组里的方法在执行的时候，this指向被绑定的DOM元素。
				//为什么要传这个参数e？
				
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}

function off(ele,type,fn){//负责把对应的方法从程序池里移除
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;
	}	
	var a=ele["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				//a.splice(i,1);
				//i--;
				break;
			}	
		}
	}
}

function processThis(fn,obj){
	return function(e){fn.call(obj,e);}	
}