


$(function(){
    //点击 去注册
    $('#link_reg').on('click',()=>{
        // $('.login-box').toggle()
        // $('.reg-box').toggle()
        $('.login-box').hide()
        $('.reg-box').show()
    
})
$('#link_login').on('click',()=>{
    // $('.login-box').toggle()
    // $('.reg-box').toggle()
     $('.login-box').show()
        $('.reg-box').hide()

})
//从第三方导入form 对象， 此处第三方是 layui ，但是这玩意好像倒闭了 
var form = layui.form
var layer = layui.layer
form.verify({
    pwd: [
        /^[\S][^%&',;=?$\x22]{6,12}$/
        ,'密码必须6到12位,且不能出现空格'
      ] 
      ,
      repwd:function(value){
       var pwds = $('.reg-box [name=password]').val();
        if(pwds!==value)
        return '两次密码不一致！'
    }
      ,username: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
          return '用户名不能有特殊字符';
        }
        if(/(^\_)|(\__)|(\_+$)/.test(value)){
          return '用户名首尾不能出现下划线\'_\'';
        }
        if(/^\d+\d+\d$/.test(value)){
          return '用户名不能全为数字';
        }
        
        //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
        if(value === 'xxx'){
          alert('用户名不能为敏感词');
          return true;
        }
      }
})

    $('#form_reg').on('submit',(e)=>{
        e.preventDefault()
        
        $.post(
            '/api/reguser',

            {
             username: $('#form_reg[name=username]').val(),

            password: $('#form_reg[name=password]').val()
            }
            ,(res)=>{
                if(res.status !== 0){

                    return layer.msg(res.message);
                }
                layer.msg('注册成功');

                $('#link_login').click();
            })

            $('#form_login').submit(function(e){
                e.preventDefault();
                $.ajax({
                    url:'/api/login',
                    method:'POST',
                    //快速获取表单中的数据
                    data : $(this).serialize(),
                    success:function(res){
                      if(res.status!==0){
                        return layer.msg('登录失败！！')
                      }
                      layer.msg('成功！')
                      // console.log(res.token);
                    //将的得到的token 保存到 localstorage
                      localStorage.setItem('token',res.token)
                      //跳转到相应的页面
                      location.href = '/index.html'
                    }
                })
            })
        
    })
})