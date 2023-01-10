
$.ajaxPrefilter(function(options){
   
    //options.url 获得的就是 传过来的 /api/reguser  这样的后缀 然后拼接起来
   options.url = 'http://www.liulongbin.top:3007'+ options.url;

   console.log(options.url);
})