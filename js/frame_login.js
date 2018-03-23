var num_left;
var timer;
//requestAnimationFrame兼容
window.requestAnimationFrame = window.requestAnimationFrame || function (a) { return setTimeout(a,1000/100);};
//cancelAnimationFrame兼容
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

//函数传参
function animation(obj,attr,target) {
    num_left = parseFloat( getStyle(obj,attr) );
    //requestAnimationFrame运动
    (function fn() {
        num_left -= 1;
        obj.style[attr] = num_left + 'px';//attr为字符串：此处不能写成obj.style.attr
        timer = requestAnimationFrame(fn);
        if (num_left<=target) {
            num_left = 0;
            // cancelAnimationFrame(timer);
        }
    }) ();
}

//封装函数：获取样式
function getStyle(obj,attr) {
    return window.getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
}
