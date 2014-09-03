/*
文件处理
*/

var fs = require('fs'),
	xfs = require('xfs'),
    logger = require('./log').logger,
    path = require('path');

var fileutil = {};
module.exports = fileutil;


fileutil.readAllFile = function(p) {
    var allfiles = [];

    if (fs.statSync(p).isDirectory() == false) {
        logger.debug('【%s】不是一个目录，不支持【%s】操作！', path, 'fileutil.readAllFile');
        return allfiles;
    }

    fs.readdirSync(p).forEach(function(f) {

        var newP = path.join(p, f);

        var stat = fs.statSync(newP);
        if (stat.isFile()) {
            allfiles.push(newP);
        } else if (stat.isDirectory()) {
            //递归调用
            var childFiles = fileutil.readAllFile(newP);
            for (var i in childFiles) {
                allfiles.push(childFiles[i]);
            }
        } else {}

    });

    return allfiles;
}

fileutil.mkdirSync = function(path) {
	xfs.mkdir(path);
}
