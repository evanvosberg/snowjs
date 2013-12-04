var version = '2.1.9';

snow.add('require.js', [
	snow.fetch('https://raw.github.com/jrburke/requirejs/' + version + '/require.js')
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