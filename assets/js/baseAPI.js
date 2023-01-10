$.ajaxPrefilter(function(options){
    console.log(options.url);
    //options.url 获得的就是 传过来的 /api/reguser  这样的后缀 然后拼接起来
    options.url = 'http://ajax.frontend.itheima.net'+options.url
})  