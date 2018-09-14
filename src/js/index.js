console.log("加载了有品的index.js");

require(["conf/config"], function () {
    require(["jquery"], function ($) {
        $(function () {
            //轮播图插件
            ! function (t) {
                function i(t, i) {
                    this.init(t, i)
                }
                i.prototype = {
                    init: function (i, n) {
                        this.ele = i, this.opts = t.extend({}, {
                            index: 0,
                            auto: !0,
                            time: 4e3,
                            indicators: !0,
                            buttons: !0
                        }, n), this.index = this.opts.index, this.render(), this.eventBind(), this.opts.auto && this.loop()
                    },
                    render: function () {
                        this.renCas(), this.opts.indicators && this.renIns(), this.opts.buttons && this.renBtns()
                    },
                    renCas: function () {
                        var t = this.ele.find(".carousel-inner"),
                            i = t.find(".carousel-item"),
                            n = i.length,
                            e = i.eq(n - 1).clone(),
                            s = i.eq(0).clone(),
                            o = this.ele.width();
                        this.index = this.index < 0 || this.index > n - 1 ? 0 : this.index, t.width((n + 2) * o).prepend(e).append(s).css(
                            "left", (this.index + 1) * -o), t.find(".carousel-item").width(o)
                    },
                    renIns: function () {
                        for (var t = this.ele.find(".carousel-item").length - 2, i = '<div class="carousel-indicators">', n = 0; n < t; n++)
                            i += '<span data-index="' + n + '"></span>';
                        i += "</div>", this.ele.append(i).find(".carousel-indicators span").eq(this.index).addClass("active")
                    },
                    renBtns: function () {
                        this.ele.append(
                            '<span class="carousel-btn carousel-prev-btn"></span><span class="carousel-btn carousel-next-btn"></span>')
                    },
                    animate: function (t) {
                        var i = this,
                            n = this.ele.find(".carousel-inner"),
                            e = this.ele.width(),
                            s = n.find(".carousel-item").length;
                        this.opts.indicators;
                        n.stop(!0, !0).animate({
                            left: n.position().left + t
                        }, function () {
                            var o = n.position().left;
                            t < 0 && o < -e * (s - 2) && n.css("left", -e), t > 0 && o > -e && n.css("left", -e * (s - 2)), i.index = n.position()
                                .left / -e - 1, i.opts.buttons && i.showBtn()
                        })
                    },
                    showBtn: function () {
                        this.ele.find(".carousel-indicators span").removeClass("active").eq(this.index).addClass("active")
                    },
                    loop: function () {
                        var t = this.ele.find(".carousel-next-btn");
                        this.timer = setInterval(function () {
                            t.trigger("click")
                        }, this.opts.time)
                    },
                    eventBind: function () {
                        var i = this,
                            n = this.ele.find(".carousel-prev-btn"),
                            e = this.ele.find(".carousel-next-btn"),
                            s = this.ele.find(".carousel-indicators"),
                            o = this.ele.width(),
                            a = (this.ele.find(".carousel-item").length, this.opts.auto);
                        e.on("click", function () {
                            i.animate(-o)
                        }), n.on("click", function () {
                            i.animate(o)
                        }), s.on("click", "span", function () {
                            i.animate((t(this).data("index") - i.index) * -o)
                        }), a && this.ele.hover(function () {
                            clearInterval(i.timer)
                        }, function () {
                            i.loop()
                        })
                    }
                }, 
                t.fn.FtCarousel = function (n) {
                    return this.each(function () {
                        new i(t(this), n)
                    })
                }
            }($);
            $("#carousel_1").FtCarousel();  
            // 加载主页图片
            var products =[];
            $.ajax({
                type: "get",
                //  url:"https://localhost:8080/proxy/youpin.mi.com/homepage/main/v1002?platform=pc",
                url: "http://localhost:8080/ajax/json/indexdata.json",
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    var floors = res.data.homepage.floors;
                    //拿有品推荐数据
                    var ypintro = floors[2];
                    console.log(ypintro);
                    var introstr = template("ypintro", {
                        ypintro: ypintro
                    })
                    $(".item-inner-ypintro").html(introstr);
                    //拿到小米众筹数据
                    var ypcrowd = floors[3];
                    console.log(ypcrowd);
                    var crowdstr = template("ypcrowd", {
                        ypcrowd: ypcrowd
                    })
                    $(".item-inner-ypcrowd").html(crowdstr);
                    //拿到商品的数据从居家开始
                    for(var i=0;i<floors.length;i++){
                        if(i>8){
                            products.push(floors[i]);
                        }
                    }
                    var htmlstr = template("productlist", {
                        products: products
                    })
                    $(".product-list").html($(".product-list").html() + htmlstr);
                    // $(".home-wrap").load("http://localhost:8080/pages/templates/index_temp.html",function(){
                    //     console.log("temp");
                    //     template("homewrap", {
                    //         products: products
                    //     })
                    // })
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

            //新品点击轮播
            var count = 0;
            $(".m-main-sec .carousel-prev-btn").on("click", function () {
                if (count >= 2) return;
                console.log("左移");
                $(".m-goods-item-container").animate({ left: -271 * ++count }, 300);
            })
            $(".m-main-sec .carousel-next-btn").on("click", function () {
                if (count <= 0) return;
                console.log("右移");
                // if(count==2)count=1;
                console.log("you" + count)
                $(".m-goods-item-container").animate({ left: -271 * --count }, 300);
            })

            //输入框搜索
            $(".m-search-input").on("input", function () {
                console.log("input");
                $(".hint").show();
                $(".m-search-box").addClass("input-bottom");
                $(".hint").on("click", "li", function () {
                    $(".m-search-input").val($(this).text());
                    $(".hint").hide();
                })
            })
            $(".m-search-input").blur(function () {
                $(".m-search-box").removeClass("input-bottom");
            })


        })
    })
})