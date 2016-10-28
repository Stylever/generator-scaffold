var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var nunjucks = require('nunjucks'); // template
var favicon = require('serve-favicon'); // favicon
var render = require('./middleware/render');
var timer = require('./middleware/timer');
var routers = require('./middleware/routers');
var log4js = require('log4js');
var log4jsConfig = require('./config/log4js_config');
var envConfig = require('./config/envConfig');

var app = express();
var env = process.env.NODE_ENV || "development";

// template config
var nunjucksTemplate = nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
    watch: true,
    express: app,
	tags: {
		blockStart: '{%',
		blockEnd: '%}',
		variableStart: '{{=',
		variableEnd: '}}',
		commentStart: '{#',
		commentEnd: '#}'
	}
});
// filter
// 4个字符分隔
nunjucksTemplate.addFilter('blank4', function(str) {
    return str.replace(/([A-Za-z0-9]{4})(?=[A-Za-z0-9])/g, '$1 ');
});
if (env === 'development') {
    nunjucksTemplate.addFilter('versionFilter', function(str) {
        return str.split('.')[0];
    });
} else {
    nunjucksTemplate.addFilter('versionFilter',  function (str) {
        return str;
    });
}

//add nunjucks global param
nunjucksTemplate.addGlobal('env', env);
nunjucksTemplate.addGlobal('staticBaseUrl', envConfig[env].staticBaseUrl);

// views engine
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'html');

// static
app.use(express.static(path.join(__dirname, envConfig[env].staticPath)));
app.use(favicon(__dirname + '/public/style.png'));

//format cookie & http
app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

// middleware
app.use(timer);
app.use(render);
// log4js
log4js.configure(log4jsConfig[env].config);
app.use(log4js.connectLogger(log4js.getLogger('out'), {
        format: log4jsConfig[env].format
    }));

// router
routers(app, {
	dirPath: __dirname + '/routes/'
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    if (req.originalUrl.search(/(.jpeg|.jpg|.png|.css|.js)/g) > -1) {
        res.status(err.status).end();
    } else {
        res.status(err.status);
        res.render('application/error/404', {
            message: err.message,
            error: err,
            distCss: ["error.9441f39915"],
            distJs: ["project/error/main.533a106acc88738baa39"] 
        });
    }
});

// error handlers
// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);  
});

// port
app.listen(envConfig[env].port);

console.log('NODE_ENV:' + env + ', port:' + envConfig[env].port);

module.exports = app;


