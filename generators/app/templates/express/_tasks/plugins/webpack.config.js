var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

var paths = {
    dev: {
        js: __dirname + '/../../public/dev/js'
    },
    dist: {
        js: __dirname + '/../../public/dist/js'
    }
};

function getEntryObj() {

    var obj = {};
    var files = glob.sync(paths.dev.js + '/project/**/main.js');

    files.forEach(function (item, index) {
        var regExp = new RegExp('project/(.*).js', 'g');

        regExp.exec(item);
        obj[RegExp.$1] = item;
    });

    return obj;

}

module.exports = {
    entry:  getEntryObj(),
    output: {
        path: path.join(paths.dist.js, '/project'),
        filename: '[name].[chunkhash].js',
        chunkFilename: "[id].[chunkhash].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        root: path.resolve(paths.dev.js),
        extensions: ['', '.js'],
        alias: {
            zepto: 'libs/zepto'
        }
    },
    externals: [
        {
            Zepto: 'window.Zepto',
            '$': 'window.Zepto'
        }
    ],
    amd: {
        jQuery: true,
        Zepto: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: 'common.[chunkhash].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        }),
        new webpack.ProvidePlugin({
            $: 'zepto',
            Zepto: 'zepto',
            'window.Zepto': 'zepto'
        })
    ]
};
