var version = '1.4.0',
	content = snow.fetch('https://raw.github.com/carhartl/jquery-cookie/v' + version + '/jquery.cookie.js')
		.toString()
		.replace(/(define\()(\[)/, '$1\'jquery/cookie\', $2')
		.replace(/(\}\)\);\s*$)/, '	return $;\n$1');

snow.add('jquery/cookie.js', content);