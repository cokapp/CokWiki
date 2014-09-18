var Handler = gb.AbstractHandler.extend({
    HandlerRegExp: '/wiki/login',
    doGet: function() {
        var _this = this;
        this.render('login', {
            layout: 'null'
        });
    },
    doPost: function() {
        var _this = this;

        var user = _this.model;

        if(gb.config.auth.username == user.username 
            && gb.config.auth.password == user.password){
            _this.para.req.session.user = user;
        }
        this.render('login', {
            layout: 'null'
        });
    }

});

module.exports = Handler;
