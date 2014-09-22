//Set Core Lib
var path = require('path');

var NodeMVC = require('cokmvc');
//var NodeMVC = require('../../index');

var options = {
	appRoot: path.join(__dirname, 'core'),
	cfgFiles: [{
		weight: 3,
		file: path.join(__dirname, 'conf.json')
	}]
};

//StartUP
NodeMVC.startup(options, function(server){
	//NodeMVC is working, enjoy!

	//set env
	process.env.TMPDIR = './content/temp';

	//load indexing
	var indexModel = require('./core/models/indexModel');
	ctx.indexing = new indexModel();
	ctx.indexing.rebuild();

	var shelfModel = require('./core/models/shelfModel');
	ctx.shelf = new shelfModel();
	ctx.shelf.rebuild();

});

