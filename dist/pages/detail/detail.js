console.log("\u52A0\u8F7Ddetail.js"),require(["../../js/conf/config"],function(){require(["jquery","common"],function(a,b){a(function(){var c=[],d=b.getCookie("detail");d&&(c=JSON.parse(d));var e=[],f=b.getCookie("list");if(f)var e=JSON.parse(f);let g=[],h=b.getCookie("userlist");h&&(g=JSON.parse(h));var i=0;a.each(e,function(a,b){i+=b.count}),a(".top").load("/pages/templates/index/top.html",function(){h?(console.log("yes"),a(".haslog").show(),a(".unlog").hide(),a(".user-center").mouseenter(function(){a(".user-drop").slideToggle("fast","linear")}),a(".user-center").mouseleave(function(){a(".user-drop").hide()}),a(".my-order").on("click",function(){window.open("/pages/personal/personal.html")}),a(".logout").click(function(){console.log("out");var a=new Date;a.setDate(a.getDate()-999),document.cookie="userlist="+h+";expires="+a+";path=/",window.location.href="/"})):(a(".haslog").hide(),a(".unlog").show())}),a(".header").load("/pages/templates/index/header.html",function(){0!=i&&a(".m-cart-news").text(i),a(".m-search-input").on("input",function(){a(".hint").show(),a(".m-search-box").addClass("input-bottom"),a.ajax({type:"get",url:`http://suggestion.baidu.com/?wd=`+a(this).val(),dataType:"jsonp",jsonp:"cb",success:function(b){a(".hint ul").html(""),b.s.forEach(b=>{var c=document.createElement("li");c.innerText=b,a(".hint ul").append(c)}),a(".hint ul").on("click","li",function(){a(".m-search-input").val(a(this).text()),a(".hint").hide()})},error:function(){console.log("search error")}})}),a(".m-search-input").blur(function(){a(".m-search-box").removeClass("input-bottom")})}),a(".footer").load("/pages/templates/index/footer.html"),a(".detail-container").load("/pages/templates/shopdetail.html",function(){var d=template("shopdetail",{detail:c});console.log(c),a(".detail-container").html(d);var e=0;a(".thumb-arrow-up").on("click",function(){console.log("up:"+e);0==e||(0<e&&2==e?(e=-1,a(".thumb-pic").animate({top:111*e})):(e=1)&&(e=0,a(".thumb-pic").animate({top:111*e})))}),a(".thumb-arrow-down").on("click",function(){return console.log("down:"+e),2==e?void(e=2):void a(".thumb-pic").animate({top:111*-++e})}),a(".thumb-container").on("click",".thumb-pic",function(){a(this).addClass("thumb-pic-active").siblings().removeClass("thumb-pic-active");var b=a(".thumb-pic").index(this);a(".main img").eq(b).show().siblings().hide(),console.log(a(".main").eq(b))}),a(".tag-item-onSaled").on("click",function(){console.log(a(this)),a(this).addClass("tag-item-onSaled-active").siblings().removeClass("tag-item-onSaled-active")});var f=[];a(".m-btn-brown").on("click",function(){var c=a(".good-name").text(),e=a(".value").text(),g=a(".main").find("img:first").attr("src");console.log(g);var h=b.getCookie("list");null!=h&&(f=JSON.parse(h));var j={name:c,price:e,imgurl:g,count:1},k=f.some(function(a){return res=a.name==j.name,res&&a.count++,res});k||f.push(j);var l=JSON.stringify(f),m=new Date;m.setDate(m.getDate()+3),document.cookie="list="+l+";expires="+m+";path=/",a(".m-cart-news").text(++i),console.log("\u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F"),a(".add-remind").fadeIn("200"),setTimeout(function(){a(".add-remind").hide()},2e3)})})})})});