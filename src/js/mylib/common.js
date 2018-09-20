define(["jquery"], function ($) {
    $(function () {
        //设置cookie
        setCookie = function (key, value, expires, path) {
            switch (arguments.length) {
                case 0:
                case 1:
                    throw new Error("参数错误");
                case 2:
                    {
                        document.cookie = key + "=" + value;
                        break;
                    };
                case 3:
                    {
                        var param = arguments[2];
                        if (typeof (param) == "number") {
                            var d = new Date();
                            d.setSeconds(d.getSeconds() + param);
                            document.cookie = key + "=" + value + "; expires=" + d;
                        } else if (typeof (param) == "string") {
                            document.cookie = key + "=" + value + "; path=" + param;

                        }
                    };
                case 4:
                    {
                        var d = new Date();
                        d.setSeconds(d.getSeconds() + expires);
                        document.cookie = key + "=" + value + "; expires=" + d + "; path=" + path;
                    }
            }


        }
        //获取Cookie
        getCookie = function (key) {
            var cookier = document.cookie;
            var list = cookier.split("; ");
            for (var i = 0; i < list.length; i++) {
                var ke = list[i].split("=");
                if (ke[0] == key) return ke[1];
            }
        }
        function getCookieValue(name) {
            var name = escape(name);  //name为指定的名称
            var allcookies = document.cookie;
            console.log(typeof (allcookies));

            name += "=";
            var pos = allcookies.indexOf(name);
            if (pos != -1) {
                var start = pos + name.length;
                var end = allcookies.indexOf(";", start);
                //这里是根据;分隔符来分隔出该名称的值，如果在设置Cookie时用的是,分隔，请替换成相应符号。
                if (end == -1) {
                    end = allcookies.length;
                }
                var value = allcookies.substring(start, end);
                return unescape(value);
            } else {
                return "";
            }
        }
        //防抖
        function debounce(callback, delay, context) {
            var timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    callback.call(context)
                }, delay);
            }
        }
        //节流
        function throttle(callback, duration, context) { //回调函数 间隔时间 操作区域
            var lasttime = 0;
            return function (e) {
                var now = new Date().getTime();
                if (now - lasttime > duration) { //第一次一定会执行
                    callback.call(context, e); //用调这个函数来调用回调函数
                    lasttime = new Date().getTime(); //更新时间             
                }
            }
        }
        //随机数
        function randomInt(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        }
        //随机颜色
        function randomColor() {
            var r = parseInt(Math.random() * 255);
            var g = parseInt(Math.random() * 255);
            var b = parseInt(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    })
});