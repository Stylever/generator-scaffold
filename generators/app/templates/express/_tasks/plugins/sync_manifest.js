var path = require('path');
var fs = require('fs');
var vinylRead = require('vinyl-read');

var paths = {
	manifest: {
		css: './manifest/css_manifest.json',
		js: './manifest/js_manifest.json'
	},
	replacePath: {
		routes: './routes/*.js',
		middleware: './middleware/*.js',
		model: './model/*.js',
		app: './app.js',
	},
	views: {
		footer: './views/include/footer.html'
	},
	dist: {
		js: './dist/js'
	}
};


var syncManifest = function () {

	var cssManifestJson = require('../' + paths.manifest.css);
	var jsManifestJson = require('../' + paths.manifest.js);

	for (var key in paths.replacePath) {
		var files = vinylRead.sync(path.join(__dirname, '../../', paths.replacePath[key]));

		files.forEach(function (item, index, files) {

			var contentStr = item._contents.toString();
			var contentArr = contentStr.split('distJs:');

			// js
			contentArr.forEach(function (item2, index2, array2) {
				if (index2 % 2 !== 0) {
					var arr = item2.split(']');

					// replace ' to "
					var distStr = arr[0] + ']';
					var distArr = JSON.parse(distStr.replace(/'/g, '"'));

					distArr.forEach(function (item3, index3, array3) {
						distArr[index3] = jsManifestJson[item3.split('.')[0]];
					});

					var str = JSON.stringify(distArr);

					arr[0] = str.substring(0, str.length - 1);

					contentArr[index2] = arr.join(']');

				}
			});

			contentStr = contentArr.join('distJs: ');

			// css
			contentArr = contentStr.split('distCss:');
			contentArr.forEach(function (item2, index2, array2) {
				if (index2 % 2 !== 0) {
					var arr = item2.split(']');

					// replace ' to "
					var distStr = arr[0] + ']';
					var distArr = JSON.parse(distStr.replace(/'/g, '"'));

					distArr.forEach(function (item3, index3, array3) {
						distArr[index3] = cssManifestJson[item3.split('.')[0] + '.css'].split('.css')[0];
					});

					var str = JSON.stringify(distArr);

					arr[0] = str.substring(0, str.length - 1);

					contentArr[index2] = arr.join(']');

				}
			});

			contentStr = contentArr.join('distCss: ');

			fs.writeFileSync(item.path, contentStr);

		});
	}


	// common.js
	var viewFiles = vinylRead.sync(path.join(__dirname, '../../', paths.views.footer));

	viewFiles.forEach(function (item, index) {
		var content = item._contents.toString();

		content = content.replace(/project\/common.[a-zA-Z0-9]*/g, jsManifestJson['project/common']);


		fs.writeFileSync(item.path, content);
	});

};

module.exports = syncManifest;
