var version = '2.1.2',
	date = new Date().toString();

snow.add('jquery/color.js', [
	'define("jquery/color", ["jquery"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/jquery/jquery-color/' + version + '/jquery.color.js')
		.toString()
		.replace(/@VERSION/g, version)
		.replace(/@DATE/g, date),
	'',
	'	return jQuery;',
	'});'
]);

snow.add('jquery/color/svg-names.js', [
	'define("jquery/color/svg-names", ["jquery/color"], function (jQuery) {',
	'',
	snow.fetch('https://raw.github.com/jquery/jquery-color/' + version + '/jquery.color.svg-names.js')
		.toString()
		.replace(/@VERSION/g, version)
		.replace(/@DATE/g, date),
	'',
	'	return jQuery;',
	'});'
]);