var NodeMVC = {};
module.exports = NodeMVC;

var express = require('express');

var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var path = require('path');
var fs = require('fs');

//Set AppRoot
NodeMVC.setAppRoot = function(appRoot){
    NodeMVC.APP_PATH = appRoot;
}


//StartUP
NodeMVC.startup = function(callback){

    //Load Global
    require(path.join(__dirname, 'lib/global'));
    gb.utils.loadConf(NodeMVC.APP_PATH);

    var indexFile = module.parent.filename;
    //fix win file path
    var baseFolder =  gb.path.dirname(indexFile);
    gb.config.__ENV.ROOT = baseFolder;

    gb.init();

    var app = express();

    // view engine setup
    app.use(partials());
    app.set('views', gb.path.join(gb.config.__ENV.ROOT, gb.config.__ENV.APP_PATH, gb.config.DIR.VIEWS));

    app.engine('.' + gb.config.VIEW_SUFFIX, require('ejs').renderFile);
    app.set('view engine', gb.config.VIEW_SUFFIX);

    //static dir
    for(var i in gb.config.DIR.STATIC){
        var st = gb.config.DIR.STATIC[i];
        app.use('/' + st, express.static(gb.path.join(NodeMVC.APP_PATH, st)));
    }



    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    var dispatcher = require(path.join(__dirname, 'lib/dispatcher'));
    dispatcher(app);

    app.set('port', gb.config.PORT || 80);

    var server = app.listen(app.get('port'), function() {
        gb.logger.info('Express server listening on port ' + server.address().port);
        callback(server);
    });

};
