var mapping = gb.config.URL_MAPPING;

module.exports = function(app){
    app.use(dispatcher);
};


//请求分发器
function dispatcher(req, res, next){
    //url解码
    req.url = decodeURI(req.url);

    var request_url = gb.url.parse(req.url).pathname;

    var mappedUrlPath = request_url;
    if(request_url.match(/\/$/)){
        mappedUrlPath = mappedUrlPath.substring(0, mappedUrlPath.length - 1);
    }

    for(var key in mapping){
        var val = mapping[key];
        var mts = mappedUrlPath.match(key);

        if(mts){
            mappedUrlPath = val;
            for(var i = 0; i < mts.length; i++){
                mappedUrlPath = mappedUrlPath.replace('$' + i, mts[i]);
            }
            //match the first handler only
            break;
        }
    }
    gb.logger.info('%s, dispatch the request url : %s, to desturl: %s', req.method, request_url, mappedUrlPath);

    //获取相应处理器
    var controller = gb.ControllerFactory.getHandler(mappedUrlPath);

    var handler = new controller();
    //记录映射后的urlpath
    handler.mappedUrlPath = mappedUrlPath;
    handler.hand(req, res, next);
}