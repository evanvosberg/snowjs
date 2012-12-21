var version = 'master';

snow.add('util/json.js', [
	snow.fetch('https://raw.github.com/douglascrockford/JSON-js/' + version + '/json2.js')
		.toString(),
	'',
	'define("util/json", [], function () {',
	'',
	'	return {',
	'		// Encode javascript object into json string',
	'		stringify: JSON.stringify,',
	'',
	'		// Decode json string into javascript object',
	'		parse: JSON.parse,',
	'',
	'		// Encode javascript object into json string',
	'		encode: JSON.stringify,',
	'',
	'		// Decode json string into javascript object',
	'		decode: JSON.parse',
	'	};',
	'});'
]);