//Set Core Lib
var NodeMVC = require('cokmvc');

var options = {
	appRoot: __dirname + '/core',
	cfgFiles: [{
		weight: 3,
		file: __dirname + '/conf.json'
	}]
};

//StartUP
NodeMVC.startup(options, function(server){
	//NodeMVC is working, enjoy!

	//set env
	process.env.TMPDIR = './content/temp';

	//load indexing
	var indexModel = require('./core/models/indexModel');
	gb.indexing = new indexModel();
	gb.indexing.rebuild();

	var shelfModel = require('./core/models/shelfModel');
	gb.shelf = new shelfModel();
	gb.shelf.rebuild();

});

