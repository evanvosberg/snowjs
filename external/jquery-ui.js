var version = '1.10.3',
	
	base = __dirname + '/jquery-ui/dist/jquery-ui-' + version;

// JS modules
snow.find(base + '/ui/jquery.ui.*.js')
	.forEach(function (abspath) {
		var module = (abspath)
				.replace(/jquery.ui.effect(\.|\-)?/, 'jquery.effects.')
				.replace(/^(?:.*?)(jquery\..*?)(?:\.js)$/, '$1')
				.replace(/\./g, '/'),
			source = snow.fetch(abspath)
				.toString(),
			depends = source.match(/Depends:\s*\*\s*([\s\S]+?)\s*\*\//);

		depends = !depends ? [] : (depends[1])
			.replace(/ui.effect/, 'effects')
			.replace(/\.js/g, '')
			.replace(/\./g, '/')
			.split(/\s*\*\s*/g);

		if (!depends.length) {
			depends.unshift('jquery');
		}

		depends = depends.join('", "');

		snow.add(module + '.js', [
			'define("' + module + '", ["' + depends + '"], function (jQuery) {',
			'',
			source,
			'',
			'	return jQuery;',
			'});'
		]);

	});

// CSS files
snow.find(base + '/themes/base/jquery.ui.*.css')
	.filter(function (abspath) {
		return !/ui\.(base|all)/.test(abspath);
	})
	.forEach(function (abspath) {
		var module = (abspath)
				.replace(/^(?:.*?)(jquery\..*?)(?:\.css)$/, '$1')
				.replace(/\./g, '/'),
			source = snow.fetch(abspath);
		
		snow.add(module + '.css', source);
	});

// Images
snow.find(base + '/themes/base/images/*')
	.forEach(function (abspath) {
		var target = (abspath)
				.replace(/^(?:.*?)(images\/.+)$/, 'jquery/ui/$1'),
			source = snow.fetch(abspath);
		
		snow.add(target, source);
	});