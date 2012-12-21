var version = 'master';

snow.add('jquery/fn/datalink.js', [
	'define("jquery/fn/datalink", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/jquery/jquery-datalink/' + version + '/jquery.datalink.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);