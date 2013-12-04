var version = '1.10.2',
	migrate = '1.2.1',

	jquery = snow.fetch('http://code.jquery.com/jquery-' + version + '.js')
		.toString(),

	jqueryNoExpose = (jquery)
		.replace(/\/\/ Expose jQuery as an AMD module.*$/, '})( window );'),

	jqueryMigrate = snow.fetch('http://code.jquery.com/jquery-migrate-' + migrate + '.js')
		.toString(),

	jquerySDK = snow.fetch(__dirname + '/jquery/jquery-sdk.js')
		.toString(),

	jqueryExpose = snow.fetch(__dirname + '/jquery/jquery-expose.js')
		.toString();

snow.add('jquery.js', jquery);

snow.add('jquery-sdk.js', [jqueryNoExpose, jquerySDK, jqueryExpose.replace(/@MODULE_EXPOSE/, 'jquery-sdk')]);

snow.add('jquery-migrate.js', [jqueryNoExpose, jqueryMigrate, jqueryExpose.replace(/@MODULE_EXPOSE/, 'jquery-migrate')]);

snow.add('jquery-migrate-sdk.js', [jqueryNoExpose, jqueryMigrate, jquerySDK, jqueryExpose.replace(/@MODULE_EXPOSE/, 'jquery-migrate-sdk')]);