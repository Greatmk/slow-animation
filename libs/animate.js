/**
 * Created by HUCC on 2016/10/18.
 */
//修改缓动框架
//能够给任意对象 同时修改多个属性
function animate(obj, json, fn) {
    if(obj.timer) {
        clearInterval(obj.timer);
    }
    //k  json[k]

    obj.timer = setInterval(function () {
        //获取当前值
        var flag = true;//大家的动画是不是都到了重点
        for(var k in json) {
            var attr = k;
            var target = json[k];

            var leader = getStyle(obj, attr);//auto
            leader = parseInt(leader) || 0;//如果没有这个样式，默认给0
            //leader使用getStyle是带单位的
            var step = (target - leader)/10;//最少跑1px
            if(step > 0) {
                step = Math.ceil(step);
            }else {
                step = Math.floor(step);
            }
            leader = leader + step;
            obj.style[attr] = leader + "px";//px不能丢

            //等所有的属性都到了终点的时候才清除定时器
            if(leader != target) {
                flag = false;//如果发现还没有到终点，赶紧吼一嗓子
            }
        }

        //如果这个时候flag是true，说明假设是成立的
        if(flag) {
            clearInterval(obj.timer);
            if(fn) {
                fn();
            }

        }

    }, 15);


}

//获取指定元素指定的样式
function getStyle(obj, attr) {
    //能力检测
    if(window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    }else {
        return obj.currentStyle[attr];
    }
}