console.log("\u52A0\u8F7D\u4E86\u6709\u54C1\u7684index.js"),require(["conf/config"],function(){require(["jquery"],function(a){a(function(){!function(a){function b(a,b){this.init(a,b)}b.prototype={init:function(b,c){this.ele=b,this.opts=a.extend({},{index:0,auto:!0,time:4e3,indicators:!0,buttons:!0},c),this.index=this.opts.index,this.render(),this.eventBind(),this.opts.auto&&this.loop()},render:function(){this.renCas(),this.opts.indicators&&this.renIns(),this.opts.buttons&&this.renBtns()},renCas:function(){var a=this.ele.find(".carousel-inner"),b=a.find(".carousel-item"),c=b.length,d=b.eq(c-1).clone(),e=b.eq(0).clone(),f=this.ele.width();this.index=0>this.index||this.index>c-1?0:this.index,a.width((c+2)*f).prepend(d).append(e).css("left",(this.index+1)*-f),a.find(".carousel-item").width(f)},renIns:function(){for(var a=this.ele.find(".carousel-item").length-2,b="<div class=\"carousel-indicators\">",c=0;c<a;c++)b+="<span data-index=\""+c+"\"></span>";b+="</div>",this.ele.append(b).find(".carousel-indicators span").eq(this.index).addClass("active")},renBtns:function(){this.ele.append("<span class=\"carousel-btn carousel-prev-btn\"></span><span class=\"carousel-btn carousel-next-btn\"></span>")},animate:function(a){var b=this,c=this.ele.find(".carousel-inner"),d=this.ele.width(),e=c.find(".carousel-item").length;this.opts.indicators,c.stop(!0,!0).animate({left:c.position().left+a},function(){var f=c.position().left;0>a&&f<-d*(e-2)&&c.css("left",-d),0<a&&f>-d&&c.css("left",-d*(e-2)),b.index=c.position().left/-d-1,b.opts.buttons&&b.showBtn()})},showBtn:function(){this.ele.find(".carousel-indicators span").removeClass("active").eq(this.index).addClass("active")},loop:function(){var a=this.ele.find(".carousel-next-btn");this.timer=setInterval(function(){a.trigger("click")},this.opts.time)},eventBind:function(){var b=this,c=this.ele.find(".carousel-prev-btn"),d=this.ele.find(".carousel-next-btn"),e=this.ele.find(".carousel-indicators"),f=this.ele.width(),g=(this.ele.find(".carousel-item").length,this.opts.auto);d.on("click",function(){b.animate(-f)}),c.on("click",function(){b.animate(f)}),e.on("click","span",function(){b.animate((a(this).data("index")-b.index)*-f)}),g&&this.ele.hover(function(){clearInterval(b.timer)},function(){b.loop()})}},a.fn.FtCarousel=function(c){return this.each(function(){new b(a(this),c)})}}(a),a("#carousel_1").FtCarousel();var b=[];a.ajax({type:"get",url:"http://localhost:8080/ajax/json/indexdata.json",dataType:"json",success:function(c){console.log(c);var d=c.data.homepage.floors,e=d[2];console.log(e);var f=template("ypintro",{ypintro:e});a(".item-inner-ypintro").html(f);var g=d[3];console.log(g);var h=template("ypcrowd",{ypcrowd:g});a(".item-inner-ypcrowd").html(h);for(var j=0;j<d.length;j++)8<j&&b.push(d[j]);var k=template("productlist",{products:b});a(".product-list").html(a(".product-list").html()+k)},error:function(){console.log("\u8BF7\u6C42\u6570\u636E\u51FA\u9519\u4E86la")}}),a(".nav-list li,.nav-detail").hover(function(){a(".nav-detail").show()},function(){a(".nav-detail").hide()}),a(".fixed-nav li:last").click(function(){a("html,body").stop().animate({scrollTop:0},1e3)}),a(window).scroll(function(){500<=a(this).scrollTop()?(a(".m-header-fix").addClass("m-header-fixed"),a(".nav-part").show(),a(".m-kind").find(".nav-part").on("mouseover",function(){a(".nav-container").addClass("nav-container-fix").show(200)}),a(".m-kind").find(".nav-part").on("mouseout",function(){a(".nav-container").removeClass("nav-container-fix")})):(a(".m-header-fix").removeClass("m-header-fixed"),a(".nav-part").hide());var b=Math.round((a(this).scrollTop()-1e3)/600);a("#LoutiNav ul li:not(last)").eq(b).addClass("hover").siblings().removeClass("hover")});var c=0;a(".m-main-sec .carousel-prev-btn").on("click",function(){2<=c||(console.log("\u5DE6\u79FB"),a(".m-goods-item-container").animate({left:-271*++c},300))}),a(".m-main-sec .carousel-next-btn").on("click",function(){0>=c||(console.log("\u53F3\u79FB"),console.log("you"+c),a(".m-goods-item-container").animate({left:-271*--c},300))}),a(".m-search-input").on("input",function(){console.log("input"),a(".hint").show(),a(".m-search-box").addClass("input-bottom"),a(".hint").on("click","li",function(){a(".m-search-input").val(a(this).text()),a(".hint").hide()})}),a(".m-search-input").blur(function(){a(".m-search-box").removeClass("input-bottom")})})})});