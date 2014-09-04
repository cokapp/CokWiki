var yml = require('../lib/yml');
var markdown = require('markdown').markdown;

var Model = Class.extend({
    exists: false,
    edit: false,
    url: null,

    title: null,
    intro: null,
    tags: null,
    source: null,

    meta: null,
    content: null,

    getFile: function() {
        var _this = this;

        var dataFolder = gb.path.join(gb.config.__ENV.ROOT, gb.config.DIR.DATA);

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

            _this.content = markdown.toHTML(md.content);
            _this.meta = yml([md.data, '---', ''].join('\n'));

            _this.title = _this.meta.title;
            _this.intro = _this.meta.intro;
            _this.tags = _this.meta.tags;

        }
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
