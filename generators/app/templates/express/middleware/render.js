var render = function (req, res, next) {
	var _render = res.render;

	res.render = function(view, options, fn) {
		var renderArguments = [];

		renderArguments = renderArguments.concat(arguments[0], arguments[1], arguments[2]);
        // template error
        renderArguments[2] = function(err, html) {
            if (err) {
                // logger.logerr(err);
                next(new Error(err));
            } else {
                res.send(html);
            }
        };

        return _render.apply(res, renderArguments);
    };
    
    next();
};

module.exports = render;