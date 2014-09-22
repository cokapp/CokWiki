var yml = require('../lib/yml'),
	low = require('lowdb');

var Model = Class.extend({

	/*
	{
	url: {
		title: '',
		intro: '',
		tags: [a, bc, def]
	},
	...
	}
	urlmap: {},
	{
	tag: []
	}
	tagmap: {}
	*/
	db: null,
	dbFile: null,
	dataPath: null,


	init: function(file){
		var _this = this;

		_this.dataPath = COKMVC.path.join(ctx.config.__ENV.APP_ROOT
			, ctx.config.DIR.DATA);

		if(typeof file == 'undefined'){
			file = 'db.json';
		}
		_this.dbFile = COKMVC.path.join(_this.dataPath, file);

	},
	//从源文件重建索引
	rebuild: function(){
		var _this = this;
		
		_this.db = low(_this.dbFile);

		_this.clear();

		var allMDs = COKMVC.fileutil.readAllFile(_this.dataPath);

        //约定：源文件以.md结尾
        var endWith = '.md';

		for(var i in allMDs){
			var md = allMDs[i];
	        if (md.slice(-endWith.length) != endWith) {
	            continue;
	        }	        
	        var url = md.replace(_this.dataPath, '').replace('.md', '');
	        _this.put(url);
		}

		_this.save();
	},
	//重新载入索引文件
	reload: function(){
		var _this = this;

		//如果不存在索引文件，则重建
		if(COKMVC.fs.exists(_this.dbFile, function(exist){
			if(!exist){
				_this.rebuild();
			}else{
				_this.db = low(_this.dbFile);
			}	
		}));

	},
	clear: function(){
		var _this = this;

		_this.db('urlmap').remove();
		_this.db('tagmap').remove();
	},
	//保存索引文件
	save: function(){
		var _this = this;

		_this.db.save();
	},
	//向索引文件中插入值
	put: function(url){
		var _this = this;

        url = url.replace(/\\/g, '/');

		
		var targetfile = COKMVC.path.join(_this.dataPath, url + '.md');
		//如果不存在目标文件，则返回
		if(COKMVC.fs.exists(targetfile, function(exist){
			if(!exist){
				COKMVC.logger.warn('文件【%s】不存在！', targetfile);
				return;
			}	
		}));

		var content = COKMVC.fs.readFileSync(targetfile, 'utf8');
		var frontMatter = yml.split(content).data;
        var doc = yml([frontMatter, '---', ''].join('\n'));

  		_this.db('urlmap').push({
  			url: url,
  			meta: doc
  		});

  		if(typeof doc.tags != 'undefined' && doc.tags != ''){
  			var tags = doc.tags.split(',');
  			for(var i in tags){
  				var tag = tags[i];

  				var tagmap = _this.db('tagmap').find({
  					tag: tag
  				}).value();

  				if(typeof tagmap == undefined || tagmap == null){
			  		_this.db('tagmap').push({
			  		    tag: tag,
			  		    urls: [url]
			  		});
  				}else{
	  				tagmap.urls.push(url);
	  				// _this.db('tagmap').find({tag: tag}).assign({urls: urls});				
  				}



  			}
  		}
	},
	//按url直接获取
	get: function(url){
		var _this = this;

		var meta = _this.db('urlmap').find({url: url}).value();

		return meta;
	},
	//按tag查找元数据
	find: function(tag){
		var _this = this;

		var metas = _this.db('tagmap').find({tag: tag}).value();

		return metas;
	}


});

module.exports = Model;