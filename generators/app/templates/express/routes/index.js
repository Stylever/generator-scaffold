var express = require('express');
var router = express.Router();
var logger = require('../middleware/logger');

var head = {
	title: 'Trip',
	keywords: 'beautiful scenery',
	description: 'beautiful scenery of the different places',
	staticPath: '/static'
};

// router
router.get('/', function (req, res, next) {
	
	res.render('application/error/404', {
            message: err.message,
            error: err,
            distCss: ["error.9441f39915"],
            distJs: ["project/error/main.533a106acc88738baa39","project/login/main.573daf9d81016dc332b7"] 
        });
});

module.exports = router;