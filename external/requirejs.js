snow.add('require.js', [
	snow.fetch(__dirname + '/requirejs/require.js')
		.toString(),
	'',
	'require({',
	'	paths: {',
	'		"$dict": "require/$dict",',
	'		"$i18n": "require/$i18n",',
	'		"$pub": "require/$pub",',
	'		"$ready": "require/$ready",',
	'		"$tmpl": "require/$tmpl"',
	'	}',
	'});'
]);