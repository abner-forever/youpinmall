console.log("加载了有品的index.js");

require(["conf/config"], function () {
    require(["jquery", "swiper","common"], function ($, Swiper,common) {
        $(function () {
            //加载购物车cookie
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

            //加载公共部分
            $(".top").load("http://localhost:9000/pages/templates/index/top.html")
            $(".header").load("http://localhost:9000/pages/templates/index/header.html", function () {
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
            $(".footer").load("http://localhost:9000/pages/templates/index/footer.html")

            //轮播图插件
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.carousel-next-btn',
                    prevEl: '.carousel-prev-btn',
                },
            })
            // 加载主页图片 数据
            var products = [];
            $.ajax({
                type: "get",
                url: "http://localhost:9000/v1002?platform=pc",
                // url:"https://youpin.mi.com/homepage/main/v1002",
                // url: "http://localhost:8080/ajax/json/indexdata.json",
                dataType: "json",
                /* jsonp : "platform",
                jsonpCallback: 'pc', */
                success: function (res) {
                    console.log(res);
                    var floors = res.data.homepage.floors;
                    //拿有品推荐数据
                    var ypintro = floors[1];
                    $(".ypintro").load("http://localhost:9000/pages/templates/index/ypintro.html", function () {
                        var introstr = template("ypintro", {
                            ypintro: ypintro
                        })
                        $(".ypintro").html(introstr);
                    });
                    //拿到小米众筹数据
                    var ypcrowd = floors[2];
                    $(".ypcrowd").load("http://localhost:9000/pages/templates/index/ypcrowd.html", function () {
                        var crowdstr = template("ypcrowd", {
                            ypcrowd: ypcrowd
                        })
                        $(".ypcrowd").html(crowdstr);
                    });
                    //拿到新品数据
                    var product_new = floors[3];
                    $(".product-newlist").load("http://localhost:9000/pages/templates/index/product_new.html", function () {
                        var product_newstr = template("product_new", {
                            product_new: product_new
                        })
                        $(".product-newlist").html(product_newstr);
                    });
                    //拿到热门数据
                    var product_hot = floors[4];
                    console.log(product_hot);

                    $(".product-hotlist").load("http://localhost:9000/pages/templates/index/product_hot.html", function () {
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
                    $(".product-list").load("http://localhost:9000/pages/templates/index/productlist.html", function () {
                        var productstr = template("productlist", {
                            products: products
                        })
                        $(".product-list").html(productstr);
                    })
                    //拿到专属推荐数据
                    var exrecommend = res.data.recommend.floors[0].data;
                    console.log(exrecommend);
                    $(".recommend-list").load("http://localhost:9000/pages/templates/index/recommend.html", function () {
                        var recommendstr = template("recommend", {
                            recommend: exrecommend
                        })
                        $(".recommend-list").html(recommendstr);
                    })

                    //跳转详情页
                    $("body").on("click", ".m-product-item-container", function () {
                        // var gid = $(this).attr("data-src");
                        var detail =[];
                        var name = $(this).find(".pro-info").text();
                        var price = $(this).find(".pro-price").find(".m-num").text();
                        var imgurl = $(this).find(".m-product-image").find("img").attr("src");
                        var summary = $(this).find(".m-product-image").find(".pro-desc").text();
                        console.log(summary);
                        
                        console.log(name,price,imgurl);
                        
                        var obj={
                            "name":name,
                            "price":price,
                            "imgurl":imgurl,
                            "summary":summary
                        }
                        detail.pop();
                        detail.push(obj);
                        var str = JSON.stringify(detail);
                        document.cookie = "detail=" + str + ";path=" + "/";
                        window.open("pages/detail/mi8.html","_blank");

                    })
                },
                error: function () {
                    console.log("请求数据出错了la");
                }
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
    })
})