__webpack_public_path__ = _global.staticBaseUrl + 'js/project/';
require(['zepto', 'moment', 'components/init'], function ($, moment) {

	$('.txt').on('click', function () {
		$(this).children().html('111');
	});


	var time = moment('20161025', 'YYYYMMDD').fromNow();
	console.log(time);


});