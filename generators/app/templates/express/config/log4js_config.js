var packageObj = require('../package.json');
var log4jsConfig = {
    development: {
         config: {
            "appenders": [
                {
                    "type": "console",
                    "category": "console"
                }, 
                {
                    "type": "console",
                    "filename": "/data/logs/node/" + packageObj.name + '/',
                    "pattern": "yyyy-MM-dd-out.log",
                    "absolute": true,
                    "alwaysIncludePattern": true,
                    "category": "out"
                }, 
                {
                    "type": "console",
                    "filename":
                     "/data/logs/node/" + packageObj.name + '/',
                    "pattern": "yyyy-MM-dd-err.log",
                    "absolute": true,
                    "alwaysIncludePattern": true,
                    "category": "err"
                }
            ],
            "replaceConsole": true,
            "levels": {
                "out": "info",
                "err": "warn",
                "console": "info"
            }
        },
        /**
         *  Tokens:
         *   - `:req[header]` ex: `:req[Accept]`
         *   - `:res[header]` ex: `:res[Content-Length]`
         *   - `:http-version`
         *   - `:response-time`
         *   - `:remote-addr`
         *   - `:date`
         *   - `:method`
         *   - `:url`
         *   - `:referrer`
         *   - `:user-agent`
         *   - `:status`
         */
        format: ":method :url :status - :response-time ms"
    },
    production: {
        config: {
            "appenders": [
                {
                    "type": "console",
                    "category": "console"
                }, 
                {
                    "type": "dateFile",
                    "filename": "/data/logs/node/" + packageObj.name + '/',
                    "pattern": "yyyy-MM-dd-out.log",
                    "absolute": true,
                    "alwaysIncludePattern": true,
                    "category": "out"
                }, 
                {
                    "type": "dateFile",
                    "filename": "/data/logs/node/" + packageObj.name + '/',
                    "pattern": "yyyy-MM-dd-err.log",
                    "absolute": true,
                    "alwaysIncludePattern": true,
                    "category": "err"
                }
            ],
            "replaceConsole": true,
            "levels": {
                "out": "info",
                "err": "warn",
                "console": "info"
            }
        },
        format: ":remote-addr :http-version :method :url :status - :referrer - :user-agent - :response-time ms"
    }
};

module.exports = log4jsConfig;