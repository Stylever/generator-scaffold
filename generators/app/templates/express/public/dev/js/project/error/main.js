__webpack_public_path__ = _global.staticBaseUrl + 'js/project/';
require(['zepto', 'components/init'], function ($) {

	$('.txt').on('click', function () {
		$(this).children().html('111');
	});
});