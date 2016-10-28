var fs = require('fs');

var routers = function (app, options) {
	var files = fs.readdirSync(options.dirPath);

	files.forEach(function (value, index, arr) {
		var name = value.split('.')[0];
		var routerName = '/' + name;
		var routerFile = require(options.dirPath + name);

		app.use(routerName, routerFile);
	});
};


module.exports = routers;