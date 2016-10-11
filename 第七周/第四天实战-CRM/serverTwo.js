var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var obj = url.parse(request.url, true),
        pathname = obj.pathname,
        query = obj.query;

    //->静态资源文件的请求处理
    var reg = /\.([a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            response.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8;'});
            response.end(conFile);
        } catch (e) {
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            response.end('NOT FOUND!');
        }
        return;
    }

    /*--API--*/
    var result = {
        code: 1,
        msg: 'ERROR',
        data: null
    };
    var conData = fs.readFileSync('./json/custom.json', 'utf-8');
    conData.length === 0 ? conData = '[]' : null;
    conData = JSON.parse(conData);

    //->获取全部的客户信息
    if (pathname === '/getAllList') {
        if (conData.length > 0) {
            result = {
                code: 0,
                msg: 'SUCCESS',
                data: conData
            };
        }
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    //->获取指定客户的信息
    if (pathname === '/getInfo') {
        var customId = query['id'];
        conData.forEach(function (item, index) {
            if (item['id'] == customId) {
                result = {
                    code: 0,
                    msg: 'SUCCESS',
                    data: item
                };
                return false;//->结束forEach循环
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    //->增加客户信息:
    //1)获取客户端传递进来的信息(客户端使用的是POST,服务端需要在请求主体中获取内容)
    //2)给传递进来的内容分自动配一个客户ID(客户ID=原来所有内容中最后一项的ID加一)
    //3)把传递的数据放入到总数据的数据中,然后把最新的总数据重新的写入到文件中
    //4)返回给客户端成功还是失败
    if (pathname === '/addInfo') {
        var str = '';
        request.on('data', function (chunk) {
            str += chunk;
        });
        request.on('end', function () {
            var data = JSON.parse(str);
            data['id'] = conData.length === 0 ? 1 : parseInt(conData[conData.length - 1]['id']) + 1;

            conData.push(data);
            fs.writeFileSync('./json/custom.json', JSON.stringify(conData), 'utf-8');

            result = {
                code: 0,
                msg: 'SUCCESS'
            };
            response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            response.end(JSON.stringify(result));
        });
    }
});
server1.listen(5678, function () {
    console.log('server is success,listening on 5678 port!');
});
