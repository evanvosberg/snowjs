var version = '1.4.7';

snow.add('jquery/fn/scrollto.js', [
	'define("jquery/fn/scrollto", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/flesler/jquery.scrollTo/' + version + '/jquery.scrollTo.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);