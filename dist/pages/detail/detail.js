
console.log("加载detail.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "template","pageinit","common"], function ($,template) {
        $(function () {
            var detail = [];
            var detailstr = getCookie("detail");
            if (detailstr) {
                detail = JSON.parse(detailstr); //将cookie转换成数组
            }
            var list = [];
            var liststr = getCookie("list");
            if (liststr) {
                var list = JSON.parse(liststr); //将cookie转换成数组
            }
            let userlist = [];
            let userstr = getCookie("userlist");
            if (userstr) {
                userlist = JSON.parse(userstr);
            }

            var totalcount = 0;
            $.each(list, function (index, value) {
                totalcount += value.count;
            })
            //加载详情信息
            $(".detail-container").load("/pages/templates/shopdetail.html", function () {
                var detailhtm = template("shopdetail", {
                    detail: detail
                })
                console.log(detail);
                $(".detail-container").html(detailhtm);


                //小图切换
                var count = 0;
                $(".thumb-arrow-up").on("click", function () {
                    console.log("up:" + count);
                    if (count == 0) return;
                    if (count > 0 && count == 2) {
                        count = -1;

                        $(".thumb-pic").animate({ top: count * 111 })
                    } else if (count = 1) {
                        count = 0;
                        $(".thumb-pic").animate({ top: count * 111 })
                    }
                })
                $(".thumb-arrow-down").on("click", function () {
                    console.log("down:" + count);
                    if (count == 2) { count = 2; return; }
                    $(".thumb-pic").animate({ top: -++count * 111 })
                })

                // 选中某个图片的状态 以及切换图片
                $(".thumb-container").on("click", ".thumb-pic", function () {
                    $(this).addClass("thumb-pic-active").siblings().removeClass("thumb-pic-active");
                    var index = $(".thumb-pic").index(this);
                    $(".main img").eq(index).show().siblings().hide();
                    console.log($(".main").eq(index));
                })
                //型号规格 选中状态
                $(".tag-item-onSaled").on("click", function () {
                    console.log($(this));

                    $(this).addClass("tag-item-onSaled-active").siblings().removeClass("tag-item-onSaled-active");
                })
                /* 加入购物车 */
                var list = [];
                $(".m-btn-brown").on("click", function () {
                    var name = $(".good-name").text();
                    var price = $(".value").text();
                    var imgurl = $(".main").find("img:first").attr("src");
                    console.log(imgurl);

                    //读取cookie
                    var liststr = getCookie("list");
                    //判断cookie信息是否存在
                    if (liststr != null) {
                        list = JSON.parse(liststr);
                    }
                    var obj = {
                        "name": name,
                        "price": price,
                        "imgurl": imgurl,
                        "count": 1
                    }
                    //判断obj
                    var newlist = list.some(function (item) {
                        res = item.name == obj.name;
                        if (res) item.count++;
                        return res;
                    })
                    //过滤后的
                    if (!newlist) {
                        list.push(obj);
                    }

                    //将数组转化为字符串
                    var str = JSON.stringify(list);

                    //写入cookie
                    var d = new Date();
                    d.setDate(d.getDate() + 3);
                    document.cookie = "list=" + str + ";expires=" + d + ";path=/";
                    $(".m-cart-news").text(++totalcount);
                    console.log("加入购物车成功");
                    $(".add-remind").fadeIn("200");
                    setTimeout(function(){
                    $(".add-remind").hide();
                    },2000)
                })

            })




        })
    })
})