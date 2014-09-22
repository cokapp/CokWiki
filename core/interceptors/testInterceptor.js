var Interceptor = gb.BaseFilter.extend({
	Point: 'After',
    doIntercept: function(req, res, next) {
        console.log('after');
        return true;
    }
});

module.exports = Interceptor;
