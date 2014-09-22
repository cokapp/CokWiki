/*
元数据拦截器
注入公共数据到客户端
*/

var Interceptor = gb.BaseFilter.extend({
	Point: 'Before',
    Weight: 9,
    doIntercept: function(req, res, next) {
        var _this = this;

        req.handler.rsp.siteConf = gb.config;

        return true;
    }
});

module.exports = Interceptor;
