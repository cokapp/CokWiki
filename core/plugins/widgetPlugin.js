/*
简单的小部件输出插件

Wiki数据解析后执行：
从views目录读取相应小部件输出

接收参数controller
语法{{widget>arguments}}
*/
var path = require('path'),
    ejs = require('ejs');

var Plugin = COKMVC.BasePlugin.extend({
    Hooks: ['wiki_parse_after'],
    exec: function(ctrl) {
        var str = ctrl.model.html;
        var re = /(\{\{widget>(.*?)\}\})/g;
        var m;

        while ((m = re.exec(str)) != null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            var file = path.join(ctx.config.__ENV.APP_ROOT
                , ctx.config.DIR.WIDGETS, m[2] + '.html');

            var widget = COKMVC.fs.readFileSync(file).toString();
            var html = ejs.render(widget, ctrl.rsp);
            ctrl.model.html = ctrl.model.html.replace(m[1], html);
        }
    }

});

module.exports = Plugin;
