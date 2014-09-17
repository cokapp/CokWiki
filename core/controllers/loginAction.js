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

        var hashedPassword = user.md5();

        if(gb.config.auth.username == user.username 
            && gb.config.auth.password == hashedPassword){
            //login success
        }




        this.render('login', {
            layout: 'null'
        });
    }

});

module.exports = Handler;
