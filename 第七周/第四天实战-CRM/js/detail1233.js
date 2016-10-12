var detailRender = (function () {
    var submit = document.getElementById('submit'),
        userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress');

    //->bindEvent:绑定提交的点击事件
    function bindEvent() {
        submit.onclick = function () {
            //->把获取的数据传递给服务器(AJAX请求)
            //-->根据获取的内容把需要传递给服务器的JSON格式的字符串准备好
            //-->发送AJAX请求
            //-->当请求成功后,根据服务器返回的结果做处理:如果增加成功回到首页,增加失败给用户一个提示即可
            /*
             此方式在IE6-7下不兼容,我们如何基于这中方式处理?
             var data = {
             name: userName.value,
             age: userAge.value,
             phone: userPhone.value,
             address: userAddress.value
             };
             data = JSON.stringify(data);*/

            var data = '{"name":"' + userName.value + '","age":' + userAge.value + ',"phone":"' + userPhone.value + '","address":"' + userAddress.value + '"}';
            ajax({
                url: "/addInfo",
                type: "POST",
                dataType: "JSON",
                data: data,
                success: function (result) {
                    if (result && result.code == 0) {
                        //->JS中实现页面跳转的方式
                        //window.location.href = "xxx"; 在当前窗口打开新页面
                        //window.open("xxx"); 在新窗口打开页面
                        window.location.href = "css3选择器.html";
                    }
                }
            });
        }
    }

    return {
        init: function () {

            //->绑定提交的点击事件
            bindEvent();
        }
    }
})();
detailRender.init();