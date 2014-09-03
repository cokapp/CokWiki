var yml = require('../lib/yml');

var Model = Class.extend({

	data: {
		path: null,
		file: null,
		/*
		{
		url: {
			title: '',
			intro: '',
			tags: [a, bc, def]
		},
		...
		}
		*/ 
		urlmap: {},
		/*
		{
		tag: []
		}
		*/
		tagmap: {}
	},

	init: function(file){
		var _this = this;

		_this.data.path = gb.path.join(gb.config.__ENV.ROOT, '_datas');

		if(typeof file == 'undefined'){
			file = 'index.json';
		}
		
		_this.data.file = gb.path.join(_this.data.path, file);

		console.log(_this.data.file);

		_this.reload();
	},
	//从源文件重建索引
	rebuild: function(){
		var _this = this;

		var allMDs = gb.fileutil.readAllFile(_this.data.path);

        //约定：以源文件以.md结尾
        var endWith = '.md';

		for(var i in allMDs){
			var md = allMDs[i];
	        if (md.slice(-endWith.length) != endWith) {
	            continue;
	        }	        
	        var url = md.replace(_this.data.path, '').replace('.md', '');
	        _this.put(url);
		}


	},
	//重新载入索引文件
	reload: function(){
		var _this = this;

		//如果不存在索引文件，则重建
		if(gb.fs.exists(_this.data.file, function(exist){
			if(!exist){
				_this.rebuild();
			}else{
				var json = JSON.parse(gb.fs.readFileSync(_this.data.file));
				_this.data.urlmap = json.urlmap;
				_this.data.tagmap = json.tagmap;	
			}		
		}));


	},
	//保存索引文件
	save: function(){
		var _this = this;
		var data = JSON.stringify(_this.data);
		gb.fs.writeFile(_this.data.file, data, function (err) {
			if (err) throw err;
			gb.logger.info('文件【%s】已保存！', _this.data.file);
		});
	},
	//向索引文件中插入值
	put: function(url){
		var _this = this;
		
		var targetfile = gb.path.join(_this.data.path, url + '.md');
		//如果不存在目标文件，则返回
		if(gb.fs.exists(targetfile, function(exist){
			if(!exist){
				gb.logger.warn('文件【%s】不存在！', targetfile);
				return;
			}	
		}));

		var content = gb.fs.readFileSync(targetfile, 'utf8');
		var frontMatter = yml.split(content).data;
        var doc = yml([frontMatter, '---', ''].join('\n'));

  		_this.data.urlmap[url] = doc;

  		if(typeof doc.tags != 'undefined' && doc.tags != ''){
  			var tags = doc.tags.split(',');
  			for(var i in tags){
  				var tag = tags[i];
  				if(typeof _this.data.tagmap[tag] == 'undefined'){
  					_this.data.tagmap[tag] = [];
  				}
  				_this.data.tagmap[tag].push(url);
  			}
  		}

		_this.save();
	},
	//按url直接获取
	get: function(url){
		var _this = this;

		var meta = _this.data.urlmap[url];

		return meta;
	},
	//按tag查找元数据
	find: function(tag){
		var _this = this;

		var metas = [];
		var urls = _this.data.tagmap[tag];
		for(var i in urls){
			var url = urls[i];
			var meta = _this.get(url);
			metas.push(meta);
		}

		return metas;
	}


});

module.exports = Model;