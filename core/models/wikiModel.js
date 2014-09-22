var yml = require('../lib/yml'),

    Showdown = require('showdown'),
    moment = require('moment'),
    ghostgfm = require('../lib/showdown/extensions/ghostgfm'),
    converter = new Showdown.converter({
        extensions: [ghostgfm]
    });

var Model = Class.extend({
    ctrl: null,
    oper: 'view',

    exists: false,
    url: null,

    source: null,
    wiki: null,

    meta: null,
    html: null,

    load: function(url) {
        var _this = this;

        _this.url = url;
        var file = _this.getFile();
        //存在目标文件
        if (COKMVC.fs.existsSync(file)) {
            _this.exists = true;
            _this.source = COKMVC.fs.readFileSync(file).toString();

            var md = yml.split(_this.source);
            _this.wiki = md.content;
            _this.meta = yml([md.data, '---', ''].join('\n'));
        } else {
            _this.meta = {};
        }
        if (typeof _this.meta.tags !== 'undefined') {
            _this.meta.tags = _this.meta.tags.split(/[, ]+/);
        } else {
            _this.meta.tags = ['no-tags'];
        }

        if (typeof _this.meta.date !== 'undefined') {
            _this.meta.date = moment(_this.meta.date);
        } else {
            _this.meta.date = moment(new Date());
        }
    },
    parse: function() {
        var _this = this;

        if (_this.source != null) {
            _this.html = converter.makeHtml(_this.wiki);
        }
    },
    getFile: function() {
        var _this = this;
        var dataFolder = COKMVC.path.join(ctx.config.__ENV.APP_ROOT, ctx.config.DIR.DATA);
        var file = COKMVC.path.join(dataFolder, _this.url + '.md');
        return file;
    },
    save: function() {
        var _this = this;

        if (ctx.config.auth && !_this.ctrl.para.req.session.user) {
            return;
        }
        //TODO合理转换为Markdown文本
        var data = _this.source;
        var file = _this.getFile();
        require('xfs').sync().save(file, data);
    }


});

module.exports = Model;
