var version = '1.9.0',
	migrate = '1.1.0';

snow.add('jquery.js', snow.fetch('http://code.jquery.com/jquery-' + version + '.js'));

snow.add('jquery-sdk.js', [
	snow.fetch('http://code.jquery.com/jquery-' + version + '.js')
		.toString(),
	snow.fetch(__dirname + '/jquery/jquery-sdk.js')
		.toString()
]);

snow.add('jquery-migrate.js', [
	snow.fetch('http://code.jquery.com/jquery-' + version + '.js')
		.toString(),
	snow.fetch('http://code.jquery.com/jquery-migrate-' + migrate + '.js')
		.toString()
]);

snow.add('jquery-migrate-sdk.js', [
	snow.fetch('http://code.jquery.com/jquery-' + version + '.js')
		.toString(),
	snow.fetch('http://code.jquery.com/jquery-migrate-' + migrate + '.js')
		.toString(),
	snow.fetch(__dirname + '/jquery/jquery-sdk.js')
		.toString()
]);