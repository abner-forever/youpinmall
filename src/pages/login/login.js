
console.log("加载login.js");
require(["../../js/conf/config"],function(){
    require(["jquery"],function($){
        $(function(){
            
            $(".login-phone").on("click",function(){
                console.log("login");
                $(".login-box").hide();
                $(".register-box").show();
            })
            $(".user-password").on("click",function(){
                console.log("login");
                $(".register-box").hide();
                $(".login-box").show();
            })
        })
    })
})
