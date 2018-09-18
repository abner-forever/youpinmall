console.log("加载shopcart.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "common"], function ($, common) {
        $(function () {
            var list = [];
            var liststr = common.getCookie("list");
            console.log(liststr);
            if (liststr) {
                var list = JSON.parse(liststr); //将cookie转换成数组
                console.log("cookie 存在");
            }
            var totalcount = 0;
            $.each(list, function (index, value) {
                totalcount += value.count;
            })
            //加载页面
            $(".top").load("http://localhost:9000/pages/templates/index/top.html")
            $(".header").load("http://localhost:9000/pages/templates/index/header.html", function () {
                //购物车商品数量
                if (totalcount != 0) {
                    $(".m-cart-news").text(totalcount);
                }
            })
            $(".footer").load("http://localhost:9000/pages/templates/index/footer.html")
            //加载购物车商品列表
            $(".goods-list").load("http://localhost:9000/pages/templates/shoplist.html", function () {
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
                //删除当前商品
                $(".edit").on("click", function () {
                    console.log("delete");
                    $(this).parent().parent().siblings(".delete-box").show();
                    $(".close-box").click(function () {
                        $(this).parent().parent(".delete-box").hide();
                    })
                    $(".cancel").click(function () {
                        $(this).parent().parent(".delete-box").hide();
                    })
                    var that = this;
                    $(".affirm").click(function () {
                        //确认删除
                        var name = $(that).siblings(".product").text();
                        $.each(list, function (index, value) {
                            if (value.name == name) {
                                list.splice(index, 1);
                                totalcount-=value.count;
                                if(totalcount==0){
                                    $(".m-cart-news").text("");
                                }else{
                                    $(".m-cart-news").text(totalcount);
                                }
                            }
                        })

                        var str = JSON.stringify(list);
                        var d = new Date();
                        d.setDate(d.getDate() + 3);
                        document.cookie = "list=" + str + "; expires=" + d + ";path=" + "/";
                        //移除元素
                        $(that).parent().parent().parent().remove();

                    })
                })
            })
        })
    })
})
