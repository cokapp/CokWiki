/*
元数据注入插件

render前执行：

接收参数controller
*/
var Plugin = COKMVC.BasePlugin.extend({
    Hooks: ['req_hand_before'],
    exec: function(ctrl) {
        ctrl.rsp.siteConf = ctx.config;
        ctrl.rsp.model = ctrl.model;
        ctrl.rsp.req = ctrl.para.req;
    }

});

module.exports = Plugin;
