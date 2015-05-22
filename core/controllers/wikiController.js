var Handler = COKMVC.BaseController.extend({
    HandlerRegExp: /^\/.*/i,
    doGet: function(cb) {
        var _this = this;

        var url = _this.para.urlPara[0];
        _this.model.load(url);

        ctx.PM.exec('wiki_parse_before', _this);
        _this.model.parse();
        ctx.PM.exec('wiki_parse_after', _this);

        cb();
    },
    doPost: function(cb) {
        var _this = this;

        _this.model.url = _this.para.urlPara[0];

        ctx.PM.exec('wiki_save_before', _this);
        _this.model.save();
        ctx.PM.exec('wiki_save_after', _this);

        _this.model.load(_this.model.url);

        ctx.PM.exec('wiki_parse_before', _this);
        _this.model.parse();
        ctx.PM.exec('wiki_parse_after', _this);

        cb();
    }

});

module.exports = Handler;
