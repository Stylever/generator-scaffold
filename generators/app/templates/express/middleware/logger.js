var log4js = require('log4js');
var logout = log4js.getLogger('out');
var logerr = log4js.getLogger('err');

var logger = {
	loginfo: function (msg) {
		logout.info(msg);
	},
	logwarn: function (msg) {
		logout.warn(msg);
		logerr.warn(msg);
	},
	logerr: function (msg) {
		logout.error(msg);
		logerr.error(msg);
	}
};

module.exports = logger;
