var utils = {};
module.exports = utils;


utils.cloneObj = function (obj) {
    var newobj, s;
    if (typeof obj !== 'object') {
        return;
    }
    newobj = obj.constructor === Object ? {} : [];
    if (JSON) {
        s = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(s); //反系列化（还原）
    } else {
        if (newobj.constructor === Array) {
            newobj.concat(obj);
        } else {
            for (var i in obj) {
                newobj[i] = obj[i];
            }
        }
    }
    return newobj;
};

utils.combine = function (from, to, isCover) {

    for (var i in from) {
        if(typeof to[i] == 'object'){
            utils.combine(from[i], to[i], isCover);
        }else if(to[i] === null || typeof to[i] === 'undefined' || isCover){
            to[i] = from[i];
        }
    }
}

utils.loadConf = function(appRoot) {

    var allConf = {};

    var convention = JSON.parse(gb.fs.readFileSync(gb.path.join(__dirname, '../conf/convention.json')));

    utils.combine(convention, allConf, true);

    var user_conf_path = gb.path.join(appRoot, 'conf');
    gb.fs.readdirSync(user_conf_path).forEach(function (file) {

        var endWith = '.json';
        if (file.slice(-endWith.length) != endWith) {
            return;
        }

        var conf = JSON.parse(gb.fs.readFileSync(gb.path.join(user_conf_path, file)));
        utils.combine(conf, allConf, true);
    });

    gb.config = allConf;
    gb.config.__ENV.APP_PATH = appRoot;
    gb.config.__ENV.ROOT = gb.path.join(__dirname, '../../');
    gb.config.__ENV.APP_ROOT = gb.path.join(gb.config.__ENV.ROOT, gb.config.__ENV.APP_PATH);

    gb.logger.info('APP GLOBAL ENV');
    gb.logger.info(gb.config);
    gb.logger.info('APP GLOBAL ENV');
    return allConf;
}

utils.getAllControllers = function() {

    var allControllers = [];

    var controllerPath = {
        core : [gb.path.join(__dirname, '../controllers/')],
        app : [gb.path.join(gb.config.__ENV.ROOT, gb.config.__ENV.APP_PATH, gb.config.DIR.CONTROLLERS, '/')]
    };

    for(var pathtype in controllerPath){
        var paths = controllerPath[pathtype];
        for(var pathindex in paths){
            var p = paths[pathindex];
            gb.logger.info('load handler in folder %s', p);
            var allFiles = gb.fileutil.readAllFile(p);
            for (var i in allFiles) {
                var file = allFiles[i];
                //约定：以Action.js结尾的为Http处理器
                var endWith = 'Action.js';
                if (file.slice(-endWith.length) != endWith) {
                    continue;
                }

                var name = file.replace('Action\.js', '');
                name = name.replace(p, '');
                name = name.replace(/\\/g, '/');

                var C = require(gb.path.join(file));
                C.prototype.HandlerName = name;
                if(C.prototype.HandlerRegExp === null){
                    var reg = C.prototype.HandlerName;
                    reg = reg.replace(/\//g, '\\\/');
                    reg = '^\\/' + reg + '$';
                    C.prototype.HandlerRegExp = new RegExp(reg, 'i');
                }

                allControllers[name] = C;

                gb.logger.info('add %s handler named %s , regexp %s, hand file = %s'
                    , pathtype
                    , C.prototype.HandlerName
                    , C.prototype.HandlerRegExp
                    , file);

            }
        }
    }

    return allControllers;
};
