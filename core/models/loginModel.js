var crypto = require('crypto');

var Model = Class.extend({
	username: null,
	password: null,

	md5: function(){
		var _this = this;

		var md5 = crypto.createHash('md5');
		md5.update(_this.password);

		return md5.digest('hex');
	}
});

module.exports = Model;