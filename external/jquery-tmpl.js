snow.add('jquery/tmpl.js', [
	'define("jquery/tmpl", ["jquery"], function (jQuery) {',
	'',
	snow.fetch(__dirname + '/jquery-tmpl/jquery.tmpl.js')
		.toString(),
	'',
	'	return jQuery;',
	'});'
]);