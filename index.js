//Set Core Lib
var NodeMVC = require('cokmvc');

//Set AppRoot
NodeMVC.setAppRoot(__dirname + '/core');

//StartUP
NodeMVC.startup(function(server){
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

