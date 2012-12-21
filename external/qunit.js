var version = '1.10.0';

snow.add(
	'qunit.js',
	snow.fetch('https://raw.github.com/jquery/qunit/v' + version + '/qunit/qunit.js')
		.toString()
);

snow.add(
	'qunit.css',
	snow.fetch('https://raw.github.com/jquery/qunit/v' + version + '/qunit/qunit.css')
		.toString()
);