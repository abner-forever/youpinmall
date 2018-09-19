let gulp = require("gulp");
let minifyJS = require("gulp-babel-minify");
let minifyCSS = require("gulp-clean-css");
let imagemin = require("gulp-imagemin");
let connect = require("gulp-connect");
let sass = require("gulp-sass");
let https = require("https");
//定义一个build任务
gulp.task("build", () => {
    //压缩JS文件
    gulp.src("./src/**/*.js")
        .pipe(minifyJS())
        .pipe(gulp.dest("./dist"))
    //压缩CSS文件
    gulp.src("./src/**/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist"))
    //复制HTML
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"));
    //复制压缩图片
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
    //编译SCSS文件
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle: "expanded"
        })).on('error', sass.logError)
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist'));

});

//刷新html界面
gulp.task("refreshHTML", () => {
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
})

gulp.task("refreshCSS", () => {
    gulp.src("./src/**/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist"))
})

gulp.task("refreshSCSS", () => {
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle: "expanded"
        })).on('error', sass.logError)
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist"))
})

gulp.task("refreshJS", () => {
    gulp.src("./src/**/*.js")
        .pipe(minifyJS())
        .pipe(gulp.dest("./dist"))
})

//创建服务器
gulp.task("server", () => {
    connect.server({
        root: "dist", //指定服务器根目录
        port: 8080,
        livereload: true,
        middleware: function (server, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
    })
    //添加监视器,监视所有文件的变化 ,执行相应任务
    gulp.watch("./src/**/*.html", ["refreshHTML"]);
    gulp.watch("./src/**/*.css", ['refreshCSS', 'refreshHTML']);
    gulp.watch("./src/**/*.js", ['refreshJS', 'refreshHTML']);
    gulp.watch("./src/**/*.scss", ['refreshSCSS', 'refreshHTML'])
})

//创建代理服务器
gulp.task("proxyserver",function(){
    var express = require("express");
    var app = express();
    app.use(express.static('dist'));
    //请求http://localhost:8080/youpin.mi.com/homepage/main/v1002?platform=pc
    app.use("/v1002",function(req,res){
        let proxy = https.request({
            hostname : "youpin.mi.com",
            path : "/homepage/main",
            method:"get",
            livereload :true
        },(response)=>{
            response.pipe(res);
        });
        proxy.on("error",(e)=>{
            console.error(`请求遇到问题:${e.message}`);
        });
        proxy.end();
    });
    var server = app.listen(9000,function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://localhost:9000'); 
    });

    //添加监视器,监视所有文件的变化 ,执行相应任务
    gulp.watch("./src/**/*.html", ["refreshHTML"]);
    gulp.watch("./src/**/*.css", ['refreshCSS', 'refreshHTML']);
    gulp.watch("./src/**/*.js", ['refreshJS', 'refreshHTML']);
    gulp.watch("./src/**/*.scss", ['refreshSCSS', 'refreshHTML'])
})