console.log("加载了有品的index.js");

require(["conf/config"], function () {
    require(["jquery", "swiper", "template", "pageinit", "common"], function ($, Swiper, template) {
        $(function () {
            // 加载主页图片 数据
            var products = [];
            var ajaxdata;
            $.ajax({
                type: "post",
                url: "http://localhost:9000/v1002?platform=pc",
                // url:"https://youpin.mi.com/homepage/main/v1002?platform=pc",
                dataType: "json",
                success: function (res) {
                    ajaxdata = res;
                },
                error: function () {
                    console.log("请求数据出错了la");
                }
            }).then(function () {
                var floors = ajaxdata.data.homepage.floors;
                //拿有品推荐数据
                var ypintro = floors[1];
                $(".ypintro").load("pages/templates/index/ypintro.html", function () {
                    var introstr = template("ypintro", {
                        ypintro: ypintro
                    })
                    $(".ypintro").html(introstr);
                });
                //拿到小米众筹数据
                var ypcrowd = floors[2];
                $(".ypcrowd").load("/pages/templates/index/ypcrowd.html", function () {
                    var crowdstr = template("ypcrowd", {
                        ypcrowd: ypcrowd
                    })
                    $(".ypcrowd").html(crowdstr);
                });
                //拿到新品数据
                var product_new = floors[3];
                $(".product-newlist").load("/pages/templates/index/product_new.html", function () {
                    var product_newstr = template("product_new", {
                        product_new: product_new
                    })
                    $(".product-newlist").html(product_newstr);
                });
                //拿到热门数据
                var product_hot = floors[4];

                $(".product-hotlist").load("/pages/templates/index/product_hot.html", function () {
                    var product_hotstr = template("product_hot", {
                        product_hot: product_hot
                    })
                    $(".product-hotlist").html(product_hotstr);
                });
                //拿到商品的数据从居家开始
                for (var i = 0; i < floors.length; i++) {
                    if (i > 7) {
                        products.push(floors[i]);
                    }
                }
                $(".product-list").load("/pages/templates/index/productlist.html", function () {
                    var productstr = template("productlist", {
                        products: products
                    })
                    $(".product-list").html(productstr);
                })
                //拿到专属推荐数据
                var exrecommend = ajaxdata.data.recommend.floors[0].data;
                $(".recommend-list").load("/pages/templates/index/recommend.html", function () {
                    var recommendstr = template("recommend", {
                        recommend: exrecommend
                    })
                    $(".recommend-list").html(recommendstr);
                })

                //跳转详情页
                $("body").on("click", ".m-product-item-container", function () {
                    // var gid = $(this).attr("data-src");
                    var detail = [];
                    var name = $(this).find(".pro-info").text();
                    var price = $(this).find(".pro-price").find(".m-num").text();
                    var imgurl = $(this).find(".m-product-image").find("img").attr("src");
                    var summary = $(this).find(".m-product-image").find(".pro-desc").text();
                    var obj = {
                        "name": name,
                        "price": price,
                        "imgurl": imgurl,
                        "summary": summary
                    }
                    detail.pop();
                    detail.push(obj);
                    var str = JSON.stringify(detail);
                    document.cookie = "detail=" + str + ";path=" + "/";
                    window.open("pages/detail/detail.html", "_blank");

                })
                //  //跳转详情页
                //  $("body").on("click", ".m-product-item-container", function () {
                //     // var gid = $(this).attr("data-src");
                //     var detail = [];
                //     var gid = $(this).attr("data-src");
                //     var obj = {
                //         "gid" : gid
                //     }
                //     detail.pop();
                //     detail.push(obj);
                //     var str = JSON.stringify(detail);
                //     document.cookie = "detail=" + str + ";path=" + "/";
                //     window.open("pages/detail/detail.html", "_blank");
                // })
            })

            //轮播图插件
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                // 分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 前进后退按钮
                navigation: {
                    nextEl: '.carousel-next-btn',
                    prevEl: '.carousel-prev-btn',
                },
            })

            //导航详细信息显示
            $(".nav-list li,.nav-detail").hover(
                function () {
                    $(".nav-detail").show();
                },
                function () {
                    $(".nav-detail").hide();
                }
            )


        })
    })
})