~function (pro) {
    //->queryURLParameter:把URL地址问号后面的参数值以对象键值对的方式保存下来
    function queryURLParameter() {
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);
/*var str = 'http://localhost:1234/detail.html?id=4&age=25';
 str.queryURLParameter();*/

var detailRender = (function () {
    var submit = document.getElementById('submit'),
        userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress');
    var customId = null,
        isUpdate = false;

    //->bindEvent:绑定提交的点击事件
    function bindEvent() {
        submit.onclick = function () {
            if (isUpdate) {
                //->修改
                var data = '{"id":' + customId + ',"name":"' + userName.value + '","age":' + userAge.value + ',"phone":"' + userPhone.value + '","address":"' + userAddress.value + '"}';
                ajax({
                    url: '/updateInfo',
                    type: 'POST',
                    dataType: 'JSON',
                    data: data,
                    success: function (res) {
                        if (res && res.code == 0) {
                            window.location.href = 'css3选择器.html';
                        }
                    }
                });
                return;
            }
            //->增加
            data = '{"name":"' + userName.value + '","age":' + userAge.value + ',"phone":"' + userPhone.value + '","address":"' + userAddress.value + '"}';
            ajax({
                url: "/addInfo",
                type: "POST",
                dataType: "JSON",
                data: data,
                success: function (result) {
                    if (result && result.code == 0) {
                        window.location.href = "css3选择器.html";
                    }
                }
            });
        }
    }

    return {
        init: function () {
            //->进入页面首先应该获取URL地址栏中的参数信息,如果有ID就是修改而不是增加,并且还需要知道修改的是哪一个客户(获取浏览器地址栏的URL:window.location.href)
            //'http://localhost:1234/detail.html?id=4&age=25' ->{id:4,age:25} 类似于NODE中的URL.PARSE第二个参数写TRUE后得到的QUERY的值
            var obj = window.location.href.queryURLParameter();
            if (typeof obj['id'] !== 'undefined') {
                isUpdate = true;
                customId = obj['id'];

                //->如果是修改的话，我们首先需要把客户信息获取到，然后把信息存储到页面的对应文本框中
                ajax({
                    url: "/getInfo?id=" + customId,
                    type: 'GET',
                    dataType: "JSON",
                    success: function (result) {
                        if (result && result.code == 0) {
                            var data = result.data;
                            userName.value = data['name'];
                            userAge.value = data['age'];
                            userPhone.value = data['phone'];
                            userAddress.value = data['address'];
                        }
                    }
                });
            }

            //->绑定提交的点击事件
            bindEvent();
        }
    }
})();
detailRender.init();