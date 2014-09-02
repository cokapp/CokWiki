var Handler = gb.AbstractHandler.extend({
	HandlerRegExp :/^\/.*/i,
	doAll : function() {
		var _this = this;

		var target = _this.para.urlPara[0];
		_this.model.loadMD(target);

		this.render();
	}

});

module.exports = Handler;