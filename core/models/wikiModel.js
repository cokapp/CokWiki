var yml = require('../lib/yml'),

    Showdown       = require('showdown'),
    moment         = require('moment'),
    ghostgfm       = require('../lib/showdown/extensions/ghostgfm'),
    converter      = new Showdown.converter({extensions: [ghostgfm]});

var Model = Class.extend({
    opera: 'view',

    exists: false,
    url: null,

    title: null,
    intro: null,
    tags: null,
    date: null,
    source: null,

    meta: null,
    content: null,

    getFile: function() {
        var _this = this;

        var dataFolder = gb.path.join(gb.config.__ENV.APP_ROOT, gb.config.DIR.DATA);

        var file = gb.path.join(dataFolder, _this.url + '.md');

        return file;
    },



    load: function(url) {
        var _this = this;

        _this.url = url;

        var file = _this.getFile();

        //存在目标文件
        if (gb.fs.existsSync(file)) {
            _this.exists = true;

            var mdStr = gb.fs.readFileSync(file).toString();

            var md = yml.split(mdStr);
            _this.source = mdStr;

            _this.content = converter.makeHtml(md.content);

            _this.meta = yml([md.data, '---', ''].join('\n'));
        }else{
            _this.meta = {};
        }

        if(typeof _this.meta.tags !== 'undefined'){
            _this.meta.tags = _this.meta.tags.split(/[, ]+/);
        }else{
            _this.meta.tags = ['no-tags'];
        }

        if(typeof _this.meta.date !== 'undefined'){
            _this.meta.date = moment(_this.meta.date);
        }else{
           _this.meta.date = moment(new Date());
        }

        _this.title = _this.meta.title;
        _this.intro = _this.meta.intro;
        _this.tags = _this.meta.tags;
        _this.date = _this.meta.date;

    },

    init: function() {
        var _this = this;
    },

    save: function() {
        var _this = this;
        //TODO合理转换为Markdown文本
        var data = _this.source;
        var file = _this.getFile();

        require('xfs').sync().save(file, data);
    }


});

module.exports = Model;
