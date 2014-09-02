/**
 * 全局变量
 * 输出到node全局变量global
 */

var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    async = require('async');

var utils = require('./utils'),
    log = require('./log'),
    fileutil = require('./fileutil'),
    hashmap = require('./hashmap'),
    ControllerFactory = require('./ControllerFactory');

var gb = {};
global.gb = gb;


gb.fs = fs;
gb.url = url;
gb.path = path;
gb.async = async;

gb.utils = utils;
gb.logger = log.logger;
gb.fileutil = fileutil;
gb.hashmap = hashmap;
gb.ControllerFactory = ControllerFactory;


//执行闭包，导出Class类，使用Class.extend继承
require('./SimpleInheritance');


gb.init = function(){

    var AbstractHandler = require('../controllers/AbstractHandler');
    gb.AbstractHandler = AbstractHandler;

    gb.allControllers = gb.utils.getAllControllers();

}
