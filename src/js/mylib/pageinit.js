define(["jquery","common"], function($) {
    
    $(function(){
        
        //加载购物车cookie
        var list = [];
        let userlist = [];
        var liststr = getCookie("list");
        
        let userstr = getCookie("userlist");
        if (liststr) {
            list = JSON.parse(liststr); //将cookie转换成数组
        }
        if (userstr) {
            userlist = JSON.parse(userstr);
        }
        var totalcount = 0;
        $.each(list, function (index, value) {
            totalcount += value.count;
        })
        //加载公共部分
        $(".top").load("/pages/templates/index/top.html", function () {
            //判断是否登录
            if (userstr) {
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
            } else {
                $(".haslog").hide();
                $(".unlog").show();
            }

        })
        $(".header").load("/pages/templates/index/header.html", function () {
            //输入框搜索
            $(".m-search-input").on("input", function () {
                $(".hint").show();
                $(".m-search-box").addClass("input-bottom");

                //假装请求有品的数据 实际来自百度 测试使用
                $.ajax({
                    type: "get",
                    url: `http://suggestion.baidu.com/?wd=` + $(this).val(),
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function (data) {
                        $(".hint ul").html("");
                        data.s.forEach(item => {
                            var li = document.createElement("li");
                            li.innerText = item;
                            $(".hint ul").append(li);
                        });
                        $(".hint ul").on("click", "li", function () {
                            $(".m-search-input").val($(this).text());
                            $(".hint").hide();
                        });
                    },
                    error: function () {
                        console.log("search error");
                    }
                })

            })
            $(".m-search-input").blur(function () {
                $(".m-search-box").removeClass("input-bottom");
            })
            //购物车商品数量
            if (totalcount != 0) {
                $(".m-cart-news").text(totalcount);
            }
        })
        $(".footer").load("/pages/templates/index/footer.html");

        //返回顶部
        $(".fixed-nav li:last").click(function () {
            $("html,body").stop().animate({ scrollTop: 0 }, 1000);
        })

        //下滑固定头部
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 500) {
                $(".m-header-fix").addClass("m-header-fixed");
                $(".nav-part").show();
                $(".m-kind").find(".nav-part").on("mouseover", function () {
                    $(".nav-container").addClass("nav-container-fix").show(200);
                });
                $(".m-kind").find(".nav-part").on("mouseout", function () {
                    $(".nav-container").removeClass("nav-container-fix");
                });
            } else {
                $(".m-header-fix").removeClass("m-header-fixed");
                $(".nav-part").hide();
            }
            var index = Math.round(($(this).scrollTop() - 1000) / 600);
            $("#LoutiNav ul li:not(last)").eq(index).addClass("hover").siblings().removeClass("hover")
        })

    })
});