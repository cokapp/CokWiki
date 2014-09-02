/*
404
 */

var AbstractHandler = require('../AbstractHandler');

var Handler = AbstractHandler.extend({
	doAll : function() {
	    this.para.res.send({  
	        status: 404,  
	        message: 'page is not found!',  
	    });  
	}

});

module.exports = Handler;