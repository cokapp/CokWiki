/*
 控制器工厂
 根据path/name直接返回控制器
 */
var fs = require('fs');
var path = require('path');

var fac = {};
module.exports = fac;

fac.getHandler = function (urlpath) {

    for (var name in gb.allControllers) {
        var C = gb.allControllers[name];
        var mts = urlpath.match(C.prototype.HandlerRegExp);
        if (mts) {
            gb.logger.info('%s matched controller named %s, regexp %s', urlpath, name, C.prototype.HandlerRegExp);
            return gb.allControllers[name];
        }
    }

    gb.logger.warn('%s matched no controller, used e404 handler instead', urlpath);
    return gb.allControllers['error/e404'];
}