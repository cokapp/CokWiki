/*
引用其他wiki页面

Wiki数据解析前执行：
从data目录读取相应页面

接收参数model
语法{{page>arguments}}
*/
var path = require('path');

var Plugin = COKMVC.BasePlugin.extend({
    Hooks: ['wiki_parse_before'],
    exec: function(ctrl) {
        var str = ctrl.model.wiki;
        var re = /(\{\{page>(.*?)\}\})/g;
        var m;
        while ((m = re.exec(str)) != null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            var file = path.join(ctx.config.__ENV.APP_ROOT
                , ctx.config.DIR.DATA, m[2] + '.md');
            var widget = COKMVC.fs.readFileSync(file).toString();
            ctrl.model.wiki = ctrl.model.wiki.replace(m[1], widget);
        }
    }

});

module.exports = Plugin;
