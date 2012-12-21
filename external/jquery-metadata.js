var version = 'master';

snow.add('jquery/metadata.js', [
	'define("jquery/metadata", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/jquery/jquery-metadata/' + version + '/jquery.metadata.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);