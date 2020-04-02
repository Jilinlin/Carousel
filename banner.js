(function(){//立即执行函数
    //原html结构
    var html = 
        `<div class="slider" id="slider">
            <div class="slide"><img src="img/b5.png" alt=""></div>
            <div class="slide"><img src="img/b1.png" alt=""></div>
            <div class="slide"><img src="img/b2.png" alt=""></div>
            <div class="slide"><img src="img/b3.png" alt=""></div>
            <div class="slide"><img src="img/b4.png" alt=""></div>
            <div class="slide"><img src="img/b5.png" alt=""></div>
            <div class="slide"><img src="img/b1.png" alt=""></div>
        </div>
        <span id="left"><</span>
        <span id="right">></span>
        <ul class="nav" id="navs">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>`;

    //获取盒子并添加
    var $box = $('#box');
    $box.append(html);

    //获取左右箭头
    var $left=$('#left');
    var $right=$('#right');

    // 获取圆点并初始化第一个圆点
    var $navs = $('#navs').children();
    $navs[0].className='active'

    // 获取整个轮播框
    var $slider = $('#slider');

    // 获取图片数量
    var imgNumber =$('.slide').length-2;//左右各多一张

    // 设置定时器
    var timer = setInterval(function(){
        next();
    },3000);

    // 设置索引
    var index = 0;

    // 左右箭头点击触发上一页、下一页事件
    $left.click(function(){
        pre();
    });
    $right.click(function(){
        next();
    });

    // 鼠标移入移出事件：移入显示左右箭头并停止轮播，移出不显示左右箭头并开始轮播
    $box.mouseover(function(){
        $left.css('opacity',0.4);
        $right.css('opacity',0.4);
        clearInterval(timer);
    })
    $box.mouseout(function(){
        $left.css('opacity',0);
        $right.css('opacity',0);
        timer = setInterval(function(){
            next();
        },3000);
    })

    // 圆点的切换点击事件
    function navsChange(index){
        for(var i = 0; i < $navs.length; i++){
            $navs[i].removeAttribute("class","active");
        }
        $navs[index].setAttribute("class","active");//只有点击的设置active
    }
    for(var i=0;i<imgNumber;i++){
        (function (j) {
            $navs[j].onclick = function(){
                if(j-index > 0){//点击页面在当前页面的后面
                    $slider.animate({left:'-=' + 1200*(j-index)},1000);
                }
                else if(j-index < 0){//点击页面在当前页面的前面
                    $slider.animate({left:'+=' + 1200*(index-j)},1000);
                }
                else{
                    return true;
                }
                navsChange(j);//相应改变圆点显示
                index=j;
            }
        })(i)
    }

    // 上一张、下一张函数
    function pre(){
        if(index == 0){//如果是第一张，切换到第五张，左移1200*imgNumber
            $slider.animate({left:'+=' + 1200},1000,function(){
                $slider.css('left',-1200*imgNumber);
            })
            navsChange(imgNumber-1);//圆点显示第五个
            index = imgNumber - 1;
        }
        else{//不是第一张
            $slider.animate({left:'+=' + 1200},1000);
            navsChange(index - 1);
            index--;
        }
    }
    function next(){
        if(index == imgNumber-1){//如果是最后一张，切换到第一张
            $slider.animate({left:'-=' + 1200},1000,function(){
                $slider.css('left',-1200);
            })
            navsChange(0);//圆点显示第一个
            index = 0;
        }
        else{//不是最后一张
            $slider.animate({left:'-=' + 1200},1000);
            navsChange(index + 1);
            index++;
        }
    }
    
})();