var $banner=$("#banner");
var $bannerInner=$banner.find(".bannerInner");
var $focusList=$banner.find(".focusList");
var $left=$banner.children(".left");
var $right=$banner.children(".right");
var $imgs=null;
var $lis=null;

//jQuery获取到的是一个jq实例，如果页面中已经存在的元素可以直接获取，如果不存在，获取回来结果将大相径庭，通过数据绑定的方式添加进来的元素，也由于原生对象存在dom映射，所以在添加之前可以直接获取，在后面添加进来后无需再次获取，就可以通过dom映射直接关联；jquery对象不存在类似dom映射的这种关系，所以在数据添加进页面之前获取无效，反而因保存过jq变量带来麻烦事；
var data=null;

;(function getData(){
    $.ajax({
        open:"get",
        url:"data.txt?_="+Math.random(),
        async:false,
        dataType:"json",
        success:function(res){
            data=res;
        }
    })
})();
;(function bindData(){
    var str="";
    var listr="";
    $(data).each(function(index,item){
        str+="<div><img src='' realSrc="+this.src+" alt=''></div>";
        listr+= index==0?"<li class='selected'></li>":"<li></li>";
    });
    $bannerInner.html(str);
    $focusList.html(listr);
})();
//重新获取lis和imgs
$imgs= $bannerInner.find("img");
$lis=$focusList.find("li");

;(function imgDload(){
    $imgs.each(function(index,item){
        index==0?($(item).parent()).css("zIndex",1).css("display","block").stop().animate({opacity:1},200):void 0;
        var $tImg=$(new Image);
        $tImg.prop("src",$(item).attr("realSrc"));
        $tImg.on("load",function(){
            $(item).prop("src",this.src);

        })

    })
})();

var step=0;
var timer=null;
function autoMove(){
    step++;
    if(step==data.length){
        step=0
    }
    setRollBanner();
    focusAlign();
}

timer=window.setInterval(autoMove,2000);

function setRollBanner(){
    $imgs.each(function(index,item){
        if(index==step){
            $(item).parent().css("zIndex",1).stop().animate({opacity:1},300,function(){
                var $sibs=$(this).siblings();
                $sibs.each(function(index,item){
                    $(this).css("opacity",0);
                })
            })
        }else{
            $(item).parent().css("zIndex",0);
        }
    })
}

function focusAlign(){
    $lis.each(function(index,item){
        if(step==index){
            $(item).addClass("selected");
        }else{
            $(item).removeClass("selected");
        }

    })
}
$banner.on("mouseover",function(index,item){
    window.clearInterval(timer);
    $left.css("display","block");
    $right.css("display","block");
});
$banner.on("mouseout",function(index,item){
    timer=window.setInterval(autoMove,2000);
    $left.css("display","none");
    $right.css("display","none");
});
$left.on("click",function(){
    if(step==0){
        step=data.length;
    }
   step--;
    setRollBanner();
    focusAlign();
});

$right.on("click",autoMove);



