var version = '1.9.0',
	migrate = '1.1.0',

	jquery = snow.fetch('http://code.jquery.com/jquery-' + version + '.js')
		.toString(),

	jqueryNoExpose = (jquery)
		.replace(/\/\/ Expose jQuery as an AMD module.*$/, "})( window );"),

	jqueryMigrate = snow.fetch('http://code.jquery.com/jquery-migrate-' + migrate + '.js')
		.toString(),

	jquerySDK = snow.fetch(__dirname + '/jquery/jquery-sdk.js')
		.toString(),

	jqueryExpose = snow.fetch(__dirname + '/jquery/jquery-expose.js')
		.toString();

snow.add('jquery.js', jquery);

snow.add('jquery-sdk.js', [jqueryNoExpose, jquerySDK, jqueryExpose]);

snow.add('jquery-migrate.js', [jqueryNoExpose, jqueryMigrate, jqueryExpose]);

snow.add('jquery-migrate-sdk.js', [jqueryNoExpose, jqueryMigrate, jquerySDK, jqueryExpose]);