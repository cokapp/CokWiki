var Handler = gb.AbstractHandler.extend({
	doAll : function() {
		this.render({
			// indexing: gb.indexing.data,
			shelf: gb.shelf
		});
	}
});

module.exports = Handler;