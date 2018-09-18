
console.log("加载login.js");
require(["../../js/conf/config"], function () {
    require(["jquery", "common"], function ($, common) {
        $(function () {
            
            var userlist = [];
            //读取cookie
            var userliststr = common.getCookie("userlist");
            //判断cookie是否存在
            if (userliststr != null) {
                userlist = JSON.parse(userliststr);
                console.log(userlist);
                $(".username").val(userlist[0].username);
                $(".password").val(userlist[0].password);
            }

            $(".login-phone").on("click", function () {
                console.log("login");
                $(".login-box").hide();
                $(".register-box").show();
                $("h1").text("小米账号注册");
            })
            $(".user-password").on("click", function () {
                console.log("login");
                $(".register-box").hide();
                $(".login-box").show();
                $("h1").text("小米账号登录");
            })
            //手机号登录/注册验证
            $(".register").on("click", function () {
                var phone = $(".phonenum").val();
                console.log(phone);

                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    $(".err-tip").show();
                    return false;
                } else {
                    $(".err-tip").hide();
                }
                if ($(".msgcode").val() != "") {
                    window.location.href = "http://localhost:9000/index.html"
                }
            })
            //账号密码登录
            $(".login").on("click", function (e) {
                e.preventDefault();
                let uName = $(".username").val();
                let uPwd = $(".password").val();

                if ($.trim(uName) == "") {
                    $(".err-tip").show();
                    $(".username").addClass("error")
                    return false;
                } else if (!/^[^@\s\?]+@[^@\s\?]+(\.[^@\s\?]+)+$|^1[34578]\d{9}$/.test(uName)) { //邮箱手机号验证
                    $(".err-tip").find("span").text("用户名格式有误");
                    $(".err-tip").show();
                    $(".username").addClass("error");
                    return false;
                } else {
                    $(".username").removeClass("error")
                    $(".err-tip").hide();
                }


                if (uPwd == "") {
                    $(".err-tip").find("span").text("密码不能为空");
                    $(".err-tip").show();
                    $(".password").addClass("error")
                    return false;
                } else if (uPwd != "123456") {     //验证后台密码
                    $(".err-tip").find("span").text("密码不正确");
                    $(".err-tip").show();
                    $(".password").addClass("error");
                    return false;
                } else {
                    $(".err-tip").hide();
                    $(".password").removeClass("error");
                    //登录之前写入cookie

                    var obj = {
                        "username": uName,
                        "password": uPwd,
                    }
                    //判断obj
                    var newlist = userlist.some(function (item) {
                        res = item.username == obj.username;
                        if (res) return;
                    })
                    //过滤后的
                    if (!newlist) {
                        userlist.pop();
                        userlist.push(obj);
                    }
                    //将数组转化为字符串
                    var str = JSON.stringify(userlist);

                    //写入cookie
                    var d = new Date();
                    d.setDate(d.getDate() + 3);
                    document.cookie = "userlist=" + str + ";expires=" + d + ";path=/";
                    console.log(common);
                    // 验证通过
                    console.log("登录成功");
                    //跳转页面
                    window.location.href="/";
                }
            })
        })
    })
})
