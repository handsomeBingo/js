//->进入首页的第一件事情:从服务器端获取全部的客户信息,然后展示在页面中
var customList = document.getElementById('customList');
ajax({
    url: '/getAllList',
    type: 'GET',
    dataType: 'JSON',
    success: function (result) {
        if (result && result['code'] == 0) {
            var data = result['data'];

            //->数据绑定
            bindHTML(data);

            //->删除:事件委托
            bindDelete();
        }
    }
});
function bindHTML(data) {
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
        var curData = data[i];
        str += '<li>';
        str += '<span class="w50">' + curData.id + '</span>';
        str += '<span class="w150">' + curData.name + '</span>';
        str += '<span class="w50">' + curData.age + '</span>';
        str += '<span class="w200">' + curData.phone + '</span>';
        str += '<span class="w200">' + curData.address + '</span>';
        str += '<span class="w150 control">';
        str += '<a href="">修改</a>';
        //->数据绑定的时候我们把客户的ID存储到元素的自定义属性上,这样以后在操作这个元素如果需要知道对应的客户ID，我们直接在自定义属性上获取即可(JS中自定义属性的解决方法是最伟大的一种编程思想)
        str += '<a href="javascript:;" data-id="' + curData.id + '">删除</a>';
        str += '</span>';
        str += '</li>';
    }
    customList.innerHTML = str;
}

function bindDelete() {
    customList.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement,
            tarTag = tar.tagName.toUpperCase();
        if (tarTag === 'A' && tar.innerHTML === '删除') {
            var customId = tar.getAttribute('data-id'),
                flag = window.confirm('您确定要删除编号为 [ ' + customId + ' ] 的客户吗?');
            if (flag) {
                ajax({
                    url: '/removeInfo?id=' + customId,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (res) {
                        if (res && res['code'] == 0) {
                            customList.removeChild(tar.parentNode.parentNode);
                        }
                    }
                });
            }
        }
    }
}