//Set Core Lib
var NodeMVC = require('./NodeMVC/NodeMVC');

//Set AppRoot
NodeMVC.setAppRoot('./app');


//StartUP
NodeMVC.startup(function(server){
	//NodeMVC is working, enjoy!
});

