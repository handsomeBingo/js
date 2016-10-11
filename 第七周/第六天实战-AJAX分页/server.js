/*
 * 导入内置模块,创建服务,监听端口;如果客户端请求的是静态资源文件的话,我们需要把资源文件中的源代码返回
 * 处理获取指定页数数据的接口
 * 处理获取指定用户信息的接口
 */
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    /*资源文件*/
    var reg = /\.([a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = "text/plain";
        switch (suffix) {
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
        }
        var conFile = 'NOT FOUND!',
            code = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf-8');
            code = 200;
        } catch (e) {
        }
        response.writeHead(code, {'content-type': suffixMIME + ';charset=utf-8;'});
        response.end(conFile);
        return;
    }

    /*API*/
    var allData = fs.readFileSync('./json/userList.json', 'utf-8');
    allData = JSON.parse(allData);
    if (pathname === '/getList') {
        //->获取客户端传递进来的page的值
        /* page    userList
         *  1         0~9
         *  2         10~19
         *  3         20~29
         *  n      (n-1)*10 ~ n*10-1
         *  10       90~99 一共98条,最大索引97,还要注意超过最大索引的处理
         */
        //->获取全部的用户信息,在全部的用户信息中提取出我们想要的
        //->计算总页数:总数据/10 在向上取整
        //->把数据返回给客户端即可
        var n = query["page"],
            result = {
                total: Math.ceil(allData.length / 10),
                data: []
            };
        for (var i = (n - 1) * 10; i <= n * 10 - 1; i++) {
            if (i > allData.length - 1) break;
            result.data.push(allData[i]);
        }
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    if (pathname === '/getInfo') {
        //->获取客户端传递过来的用户ID
        //->在所有的数据中把ID和传递进来的ID相同的那一项找到
        //->把找到的内容返回
        var id = query['id'];
        result = null;
        allData.forEach(function (item, index) {
            if (item['id'] == id) {
                result = item;
                return false;
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset= utf-8'});
        response.end(JSON.stringify(result));
    }
});
server.listen(80, function () {
    console.log('success,port 80!');
});