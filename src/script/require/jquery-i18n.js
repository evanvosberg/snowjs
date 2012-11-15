/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			require/jquery-i18n
 */

define("require/jquery-i18n", ["jquery", "jquery/i18n"], function ($, i18n) {

	var
		// add path location
		add = function (name) {
			return i18n.config.path + "/" + remove(name);
		},

		// remove path location
		remove = function (name) {
			return name.replace(/^(.*?)([^\/]+)$/, "$2");
		},

		// i18n module object
		module = {
			normalize: function (name, normalize) {
				return normalize(add(name),"",true);
			},
			load: function (path, req, load) {
				var name = remove(path),
					type,
					options;

				if (/^[A-Z]{3}$/.test(name)) {
					type = "currencies";
					options = {
						currency: name
					};
				}
				else {
					type = "regions";
					options = {
						region: name
					};
				}

				if (i18n[type][name]) {
					load(i18n(options));
				}
				else {
					$.ajax({
						// Full url
						url: req.toUrl(path + ".js"),

						// Cache request in browser
						cache: true,

						// Load as Javascript
						dataType: "script"

					})
						.done(function () {
							load(i18n(options));
						});
				}
			}
		};

	return module;
});