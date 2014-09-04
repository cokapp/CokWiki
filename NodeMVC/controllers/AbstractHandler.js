/*
 Http处理器基类
 */
var Handler = Class.extend({
    HandlerRegExp: null,
    HandlerName: null,
    method: ['all'],
    model: null,
    para: {},
    init: function () {
        var _this = this;
        gb.logger.info('HandlerName : %s is initing', this.HandlerName);
    },
    hand: function (req, res, next) {
        this.next = next;
        //step.1 参数处理
        this.para = this._reqestParse(req, res);
        //step.2 模型映射
        this._initModel();
        //step.3 正式处理Http请求
        this._dohand();
    },
    _initModel: function(){
        var _this = this;

        var appRoot = gb.config.__ENV.APP_ROOT;
        try{
            var Model = require(gb.path.join(appRoot, 'models/' + _this.HandlerName + 'Model'));
            _this.model = new Model();  
        }catch(e){
            gb.logger.info(e);
            gb.logger.info('未定义模型：%s', _this.HandlerName);
            _this.model = {};
            return;
        }

        //简单的自动映射
        for(var i in _this.model){
            if(typeof _this.para.req.param(i) === 'undefined'){
                continue;
            }
            console.log('%s=%s',i,_this.para.req.param(i));
            _this.model[i] = _this.para.req.param(i);
        }

        if(_this.initModel){
            _this.initModel();
        }
    },
    _reqestParse: function (req, res) {
        var _this = this;

        var parsedUrl = gb.url.parse(req.url);
        var pathName = this.mappedUrlPath;
        var urlPara = pathName.match(this.HandlerRegExp);
        var para = {
            parsedUrl: parsedUrl,
            pathName: pathName,
            urlPara: urlPara,
            query: req.query,
            body: req.body,
            params: req.params,
            req: req,
            res: res
        };
        gb.logger.info('reqestParsed: ' +
                '\r\n pathName: %s ' +
                '\r\n mappedPathName: %s ' +
                '\r\n urlPara: %s ' +
                '\r\n query: %s ' +
                '\r\n body: %s ' +
                '\r\n params: %s \r\n '
            , parsedUrl.pathname
            , para.pathName
            , JSON.stringify(para.urlPara)
            , JSON.stringify(para.query)
            , JSON.stringify(para.body)
            , JSON.stringify(para.params));

        return para;
    },
    _dohand: function () {
        var _this = this;

        if(_this.doAuth !== null){
            _this.doAuth();
            gb.logger.info('visit auth accepted by %s', _this.HandlerName)
        }

        gb.async.series([
            function (cb) {
                if (_this.preDoAll !== null) {
                    _this.preDoAll(cb);
                } else {
                    cb(null, null);
                }
            },
            function (cb) {
                if (_this.preDoGet !== null) {
                    _this.preDoGet(cb);
                } else {
                    cb(null, null);
                }
            },
            function (cb) {
                if (_this.preDoPost !== null) {
                    _this.preDoPost(cb);
                } else {
                    cb(null, null);
                }
            }
        ], function (e, d) {
            if (_this.doAll != null) {
                gb.logger.info('doAll by %s', _this.HandlerName);
                _this.doAll();
                return;
            }
            if (_this.para.req.method === 'GET') {
                gb.logger.info('doGet by %s', _this.HandlerName);
                _this.doGet();
            } else {
                gb.logger.info('goPost by %s', _this.HandlerName);
                _this.doPost();
            }
        });
    },
    doGet: null,
    doPost: null,
    doAll: null,

    preDoGet: null,
    preDoPost: null,
    preDoAll: null,

    doAuth: null,
    initModel: null,
    render: function (tpl, rsp) {
        var _this = this;

        var num = arguments.length;
        var template = tpl, options = rsp;
        if (num === 0) {
            //use HandlerName but HandlerRegExp
            template = this.HandlerName;
            options = {};
        } else if (num === 1) {
            template = this.HandlerName;
            options = arguments[0];
        } else {
            // template = arguments[0];
            // options = arguments[1];
        }

        if (typeof options.layout === 'undefined' || options.layout === null) {
            options.layout = '_public/layout';
        }

        options.model = _this.model;

        gb.logger.info('render tpl:%s,data:%s', template, JSON.stringify(options));
        this.para.res.render(template, options);
    },
    send: function (rsp) {
        this.para.res.send(rsp);
    }
});

module.exports = Handler;


