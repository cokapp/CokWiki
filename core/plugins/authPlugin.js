/*
权限插件

Wiki数据解析前执行：
若未登录时访问编辑页，输出登录Part
若post数据包含username和password，执行登录验证

接收参数controller
*/
var Plugin = COKMVC.BasePlugin.extend({
    Hooks: ['wiki_parse_after'],
    Priority: 9,
    exec: function(ctrl) {
        if (ctrl.model.oper === 'edit') {
            if (ctx.config.auth && ctrl.para.req.param('username') && ctrl.para.req.param('password')) {
                var user = {
                    username: ctrl.para.req.param('username'),
                    password: ctrl.para.req.param('password')
                };
                if (ctx.config.auth.username == user.username && ctx.config.auth.password == user.password) {
                    ctrl.para.req.session.user = user;
                    ctrl.model.html = '{{widget>edit}}';
                } else {
                    ctrl.model.html = '{{widget>edit}}';
                }
            } else if (ctx.config.auth && !ctrl.para.req.session.user) {
                ctrl.model.html = '{{widget>login}}';
            } else {
                ctrl.model.html = '{{widget>edit}}';
            }
        } else if (ctrl.model.oper === 'discuss') {
            ctrl.model.html = '{{widget>discuss}}';
        }
    }

});

module.exports = Plugin;
