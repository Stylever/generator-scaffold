var path = require('path');
var fs = require('fs');
var through2 = require('through2');



var jsManifest = function () {
	var jsMap = {};

	return through2.obj(function(chunk, encoding, callback) {
		var jsPath = path.relative(chunk.base, chunk.path);

		jsMap['project/' + jsPath.split('.')[0]] = 'project/' + jsPath.replace('.js', '');

		callback();
	}, function (callback) {
		fs.writeFileSync(path.join(__dirname, '../manifest/js_manifest.json'), JSON.stringify(jsMap, null, 2));
		
		callback();
	});
};

module.exports = jsManifest;

