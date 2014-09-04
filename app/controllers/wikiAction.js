var Handler = gb.AbstractHandler.extend({
    HandlerRegExp: /^\/.*/i,
    doGet: function() {
        var _this = this;

        var url = _this.para.urlPara[0];
        _this.model.load(url);

        console.log(_this.model);

        this.render();
    },
    doPost: function() {
        var _this = this;

        _this.model.url = _this.para.urlPara[0];
        _this.model.save();
        _this.model.load(_this.model.url);

        this.render();
    }

});

module.exports = Handler;
