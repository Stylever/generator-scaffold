var timer = function(req, res, next) {

    var startTime = Date.now();
    // reserve original function 
    var _send = res.send;
    // new function
    res.send = function() {
        // set header:
        res.set('X-Execution-Time', String(Date.now() - startTime));
        res.set('X-Powered-By', 'style');
        // apply
        return _send.apply(res, arguments);
    };

    next();
};

module.exports = timer;