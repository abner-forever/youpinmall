
console.log("加载personal.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "common","pageinit"], function ($) {
        $(function () {
            //选项切换
            $(".select").on("click", ".sel", function (e) {
                e.preventDefault();     //阻止默认事件 
                var index = $(".sel").index(this);      //获取当前点击元素数组下标
                $(this).find("span").addClass("select-active").end().siblings().find("span").removeClass("select-active");        //添加当前元素选中状态
                $(".personal-main-box div").eq(index).show().siblings().hide();     //右侧显示当前选项详情页
            })
        })
    })
})