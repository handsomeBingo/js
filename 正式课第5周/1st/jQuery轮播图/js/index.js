var $banner=$("#banner");
var $bannerInner=$banner.find(".bannerInner");
var $focusList=$banner.find(".focusList");
var $left=$banner.children(".left");
var $right=$banner.children(".right");
var $imgs=null;
var $lis=null;
//jQuery 获取到的是一个jq实例，如果是页面中已经存在的元素可以获取，如果不存在，即使通过数据绑定的方式重新添加进来，也不会像原生对象一样因存在dom映射关系，故无需重新获取，但是在jquery中获取了也没用，所以不存在的不要获取，在绑定数据后再获取，
var data=null;
;(function getData(){
    $.ajax({
        open:"get",
        url:"data.txt?_="+Math.random(),
        async:false,
        dataType:"json",
        success:function(res){
            data= res;
        }
    });
})();
console.log(data);
;(function bindData(){
    var str="";
    var listr="";
    $.each(data,function(index,item){
        str+="<div><img src='' realSrc="+item.src+" alt=''></div>";
        listr+= index==0?"<li class='selected'></li>":"<li></li>";
    });
    $bannerInner.html(str);
    $focusList.html(listr);
})();
$imgs=$bannerInner.find("img");
$lis=$focusList.find("li");
;(function imgDload(){
    $imgs.each(function(index,item){//遍历每一张图片做延时加载
        index==0? ($(item).parent().css("zIndex",1).css("display","block").stop().animate({opacity:1},200)):void 0;
        var $tImg=$(new Image);
        $tImg.prop("src",$(item).attr("realSrc"));
        $tImg.on("load",function(){
            $(item).prop("src",this.src);//this和原生一样
        });
    });
})();

var step=0;
var timer=null;
function autoMove(){
    if(step==data.length-1){
        step=-1;
    }
    step++;
    setBanner();
    focusAlign();
}
timer=window.setInterval(autoMove,2000);
function setBanner(){
    $imgs.each(function(index,item){
        if(index==step){
            $(item).parent().css("zIndex",1).stop().animate({opacity:1},200,function(){
                $(item).parent().siblings().css("opacity",0);
            });
        }else{
            $(item).parent().css("zIndex",0);
        }
    });
}

function focusAlign(){
    $lis.each(function(index,item){
        index==step?$(item).addClass("selected"):$(item).removeClass("selected");
    });
}

$banner.on("mouseover",function(){
    window.clearInterval(timer);
    $left.css("display","block");
    $right.css("display","block");
}).on("mouseout",function(){
    timer=window.setInterval(autoMove,2000);
    $left.css("display","none");
    $right.css("display","none");
});

$left.on("click",function(){
    step--;
    if(step==-1){
        step=data.length-1;
    }
    setBanner();
    focusAlign();
});
$right.on("click",autoMove);

;(function lisClkEvt(){
    $lis.each(function(index,item){
        $(item).on("click",function(){
            step=index;
            setBanner();
            focusAlign();
        })
    });
})();