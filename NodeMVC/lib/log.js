var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "all"
        },
        {
            type: "dateFile",
            filename: 'logs/log.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'all'
        },
        {
            type: "dateFile",
            filename: 'logs/log.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'file'
        }//
    ],
    replaceConsole: false,   //替换console.log
    levels: {
        dateFileLog: 'INFO',
        allLog: 'INFO'
    }
});

var dateFileLog = log4js.getLogger('file');
var allLog = log4js.getLogger('all');

exports.logger = allLog;

exports.use = function (app) {
    app.use(log4js.connectLogger(dateFileLog, {level: 'debug', format: ':method :url'}));
}




