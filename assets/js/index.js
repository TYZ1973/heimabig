$(function(){
    getUserInfo();
});


    $('#btnForLogout').on('click',()=>{

        layer.confirm('退出吗？', {icon: 2, title:'提示'}, function(index){
            
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });

    })


function getUserInfo(){

    $.ajax({
        method: 'GET',

        url:'/my/userinfo',

        // headers:{
        //     Authorization: localStorage.getItem('token')},
        
        success:function (res){
            if(res.status !== 0){
                return layui.layer.msg('获取失败')      
            }
            renderAvatar(res.data)
        } ,
        complete: function (res) { 
            console.log(res);
            if(res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！'){

                localStorage.removeItem('token');
                location.href = '/login.html';
            }
         },
    })

};

function renderAvatar(user){

    var na = user.nickname || user.username;
    $('#welcome').html('欢迎 ' + na);
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('text-avatar').hide();
    }else{
        $('.layui-nav-img').hide()
        var firle = na[0].toUpperCase()
        $('.text-avatar').html(firle).show()
    }

}