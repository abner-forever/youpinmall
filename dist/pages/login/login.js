console.log("\u52A0\u8F7Dlogin.js"),require(["../../js/conf/config"],function(){require(["jquery","common"],function(a,b){a(function(){var c=[],d=b.getCookie("userlist");null!=d&&(c=JSON.parse(d),console.log(c),a(".username").val(c[0].username),a(".password").val(c[0].password)),a(".login-phone").on("click",function(){console.log("login"),a(".login-box").hide(),a(".register-box").show(),a("h1").text("\u5C0F\u7C73\u8D26\u53F7\u6CE8\u518C")}),a(".user-password").on("click",function(){console.log("login"),a(".register-box").hide(),a(".login-box").show(),a("h1").text("\u5C0F\u7C73\u8D26\u53F7\u767B\u5F55")}),a(".register").on("click",function(){var b=a(".phonenum").val();return(console.log(b),!/^1[34578]\d{9}$/.test(b))?(a(".err-tip").show(),!1):void(a(".err-tip").hide(),""!=a(".msgcode").val()&&(window.location.href="http://localhost:9000/index.html"))}),a(".login").on("click",function(f){f.preventDefault();let e=a(".username").val(),g=a(".password").val();if(""==a.trim(e))return a(".err-tip").show(),a(".username").addClass("error"),!1;if(!/^[^@\s\?]+@[^@\s\?]+(\.[^@\s\?]+)+$|^1[34578]\d{9}$/.test(e))return a(".err-tip").find("span").text("\u7528\u6237\u540D\u683C\u5F0F\u6709\u8BEF"),a(".err-tip").show(),a(".username").addClass("error"),!1;if(a(".username").removeClass("error"),a(".err-tip").hide(),""==g)return a(".err-tip").find("span").text("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"),a(".err-tip").show(),a(".password").addClass("error"),!1;if("123456"!=g)return a(".err-tip").find("span").text("\u5BC6\u7801\u4E0D\u6B63\u786E"),a(".err-tip").show(),a(".password").addClass("error"),!1;a(".err-tip").hide(),a(".password").removeClass("error");var h={username:e,password:g},i=c.some(function(a){res=a.username==h.username,res});i||(c.pop(),c.push(h));var j=JSON.stringify(c),k=new Date;k.setDate(k.getDate()+3),document.cookie="userlist="+j+";expires="+k+";path=/",console.log(b),console.log("\u767B\u5F55\u6210\u529F"),window.location.href="/"})})})});