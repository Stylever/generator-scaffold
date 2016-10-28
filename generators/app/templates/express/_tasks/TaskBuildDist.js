var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpSequence = require('gulp-sequence');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var webpackConfig = require('./plugins/webpack.config');
var rev = require('gulp-rev');
var revFormat = require('gulp-rev-format');
var jsManifest = require('./plugins/js_manifest');
var syncManifest = require('./plugins/sync_manifest');

var paths = {
	dev: {
		dir: './dev',
		css: './dev/css',
		scss: './dev/scss',
		images: './dev/images',
		js: './dev/js'
	},
	dist: {
		dir: './dist',
		css: './dist/css',
		images: './dist/images',
		js: './dist/js',
		main: ['./dist/js/project/**/main.*.js', './dist/js/project/**/common.*.js']
	}
};

module.exports = function (gulp, config) {
	// clean
	gulp.task('clean', function () {
		return gulp.src([paths.dist.dir], {read: false})
			.pipe(clean());
	});

	// scss
	gulp.task('sass', function () {
		return gulp.src(paths.dev.scss + '/project/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.dev.css));
	});
	gulp.task('sass:watch', function () {
		gulp.watch(paths.dev.scss + '/project/*.scss', ['sass']);
	});
	// css
	gulp.task('css', function () {
		return gulp.src(paths.dev.css + '/**')
			.pipe(gulp.dest(paths.dist.css));
	});

	// images
	gulp.task('images', function () {
		return gulp.src(paths.dev.images + '/**/*')
			.pipe(cache(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
				use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
			})))
			.pipe(gulp.dest(paths.dist.images));
	});

	// js
	gulp.task('js', function () {
		return gulp.src('')
			.pipe(webpack(webpackConfig))
			.pipe(gulp.dest(paths.dist.js + '/project'));
	});

	// css manifest
	gulp.task('css_manifest', function () {
		return gulp.src(paths.dist.css + '/**/*.css')
			.pipe(rev())
			.pipe(revFormat({
				prefix: '.',
				suffix: '',
				lastExt: true
			}))
			.pipe(gulp.dest(paths.dist.css))
			.pipe(rev.manifest('css_manifest.json', {
				merge: true
			}))
			.pipe(gulp.dest('../_tasks/manifest'));
	});

	// js manifest
	gulp.task('js_manifest', function () {
		return gulp.src(paths.dist.main)
			.pipe(jsManifest());
	});

	// js css sync_manifest
	gulp.task('sync_manifest', function () {
		syncManifest();
	});

	// path-version-replace
	// gulp.task('path-version-replace', function () {
	// 	return gulp.src('')
	// 		.pipe(gulp.dest('./manifest'))
	// });

	// dist
	gulp.task('build_dist', gulpSequence(
		'clean',
		'sass',
		'css',
		'images',
		'js',
		'css_manifest',
		'js_manifest',
		'sync_manifest'
	));
};



// images



// js
