
console.log("加载personal.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "common"], function ($, common) {
        $(function () {
            let userlist = [];
            let userstr = common.getCookie("userlist");
            if (userstr) {
                userlist = JSON.parse(userstr);
                console.log(userlist);
                console.log("用户cookie存在");
            }
            $(".top").load("/pages/templates/index/top.html", function () {
                //判断是否登录
                console.log("yes");
                $(".haslog").show();
                $(".unlog").hide();
                $(".user-center").mouseenter(function () {
                    $(".user-drop").slideToggle("fast", "linear");
                })
                $(".user-center").mouseleave(function () {
                    $(".user-drop").hide();
                })
                $(".my-order").on("click", function () {
                    window.open("/pages/personal/personal.html");
                })
                //退出登录
                $(".logout").click(function () {
                    console.log("out");
                    var d = new Date();
                    d.setDate(d.getDate() - 999);
                    document.cookie = "userlist=" + userstr + ";expires=" + d + ";path=/";
                    window.location.href = "/";
                })
            })
            $(".header").load("/pages/templates/index/header.html", function () {

            })
            $(".footer").load("/pages/templates/index/footer.html")

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