var version = 'master';

snow.add('jquery/metadata.js', [
	'define("jquery/metadata", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/jquery-orphans/jquery-metadata/' + version + '/jquery.metadata.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);