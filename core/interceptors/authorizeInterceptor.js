var Interceptor = gb.BaseFilter.extend({
	Point: 'Before',
    doIntercept: function(req, res, next) {
    	//need login
    	if(req.handler.model.oper === 'edit' && gb.config.auth && !req.session.user){
    		req.handler.rsp.status.success = false;
    		req.handler.rsp.status.errorCode = 'not authorized';
    		req.handler.rsp.status.message = '需要登录！';
    		return false;
    	}
    	return true;
    }
});

module.exports = Interceptor;
