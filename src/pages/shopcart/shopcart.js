console.log("加载shopcart.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "common"], function ($, common) {
        $(function () {
            var list = [];
            var liststr = common.getCookie("list");
            if (liststr) {
                var list = JSON.parse(liststr); //将cookie转换成数组
            }
            let userlist = [];
            let userstr = common.getCookie("userlist");
            if (userstr) {
                userlist = JSON.parse(userstr);
            }

            var totalcount = 0;
            $.each(list, function (index, value) {
                totalcount += value.count;
            })
            //加载页面
            $(".top").load("/pages/templates/index/top.html", function () {
                //判断是否登录
                if (userstr) {
                    console.log("yes");
                    $(".haslog").show();
                    $(".unlog").hide();
                    $(".user-center").mouseenter(function () {
                        $(".user-drop").slideToggle("fast","linear");
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
                //购物车商品数量
                if (totalcount != 0) {
                    $(".m-cart-news").text(totalcount);
                }
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
            })
            $(".footer").load("/pages/templates/index/footer.html")
            //加载购物车商品列表
            $(".goods-list").load("/pages/templates/shoplist.html", function () {
                var shopliststr = template("shoplist", {
                    shoplist: list
                })
                $(".goods-list").html(shopliststr);
                console.log("加载成功");
                //增加商品count
                $(".add-num").on("click", function () {
                    var name = $(this).parent().parent().siblings(".product").text();
                    var price = Number($(this).parent().parent().siblings(".price").find("span").text());
                    var count = Number($(this).parent().find(".text").text()) + 1;
                    $(this).parent().parent().siblings(".total").find("span").text(count * price);
                    $(this).parent().find(".text").text(count);
                    $(".m-cart-news").text(++totalcount);
                    //修改cookie的count值
                    $.each(list, function (index, value) {
                        if (value.name == name) {
                            value.count = count;
                        }
                    })
                    var str = JSON.stringify(list);
                    var d = new Date();
                    d.setDate(d.getDate() + 3);
                    document.cookie = "list=" + str + "; expires=" + d + ";path=" + "/";
                })
                //减少商品count
                $(".reduce-num").on("click", function () {
                    var name = $(this).parent().parent().siblings(".product").text();
                    var count = Number($(this).parent().find(".text").text()) - 1;
                    if (count == 0) return;
                    $(".m-cart-news").text(--totalcount);
                    var price = Number($(this).parent().parent().siblings(".price").find("span").text());
                    $(this).parent().parent().siblings(".total").find("span").text(count * price);
                    $(this).parent().find(".text").text(count);
                    //修改cookie的count值
                    $.each(list, function (index, value) {
                        if (value.name == name) {
                            value.count = count;
                        }
                    })
                    var str = JSON.stringify(list);
                    var d = new Date();
                    d.setDate(d.getDate() + 3);
                    document.cookie = "list=" + str + "; expires=" + d + ";path=" + "/";
                })
                //删除当前商品 有bug
                $(".edit").on("click", function () {
                    console.log("delete");
                    $(this).parent().parent().siblings(".delete-box").show();
                    $(".close-box").click(function () {
                        $(this).parent().parent(".delete-box").hide();
                    })
                    $(".cancel").click(function () {
                        $(this).parent().parent(".delete-box").hide();
                    })
                    let that = this;
                    $(".affirm").click(function () {
                        //确认删除
                        let name = $(that).siblings(".product").text();
                        let targetindex;
                        $.each(list, function (index, value) {
                            if (value.name == name) {
                                targetindex = index; //存储目标元素下标
                                totalcount -= value.count;
                                if (totalcount == 0) {
                                    console.log("0");
                                    $(".m-cart-news").text("");
                                } else {
                                    
                                    $(".m-cart-news").text(totalcount);
                                }
                            }
                        })
                        //删除数组里面的目标元素 //在循环外边删除数组 
                        list.splice(targetindex, 1);
                        
                        var str = JSON.stringify(list);
                        var d = new Date();
                        d.setDate(d.getDate() + 3);
                        document.cookie = "list=" + str + "; expires=" + d + ";path=" + "/";
                        //移除元素
                        $(that).parent().parent().parent().remove();

                    })
                })
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
    })
})
