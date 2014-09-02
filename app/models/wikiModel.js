var Showdown = require('showdown');
var converter = new Showdown.converter();

var Model = Class.extend({
	title: null,
	intro: null,	
	tags: null,

	url: null,
	content: null,

	loadMD: function(url){
		var _this = this;

		_this.url = url;

		var dataFolder = gb.path.join(gb.config.__ENV.ROOT, '_datas'); 

		var md = gb.fs.readFileSync(gb.path.join(dataFolder, _this.url + '.md')).toString();

		_this.content = converter.makeHtml(md);
	},

	init: function(){

	}


});

module.exports = Model;