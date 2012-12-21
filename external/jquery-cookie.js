var version = '1.2.0';

snow.add('jquery/cookie.js', [
	'define("jquery/cookie", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/carhartl/jquery-cookie/v' + version + '/jquery.cookie.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);