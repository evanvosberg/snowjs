/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			$tmpl
 */

define("$tmpl", ["jquery", "jquery/tmpl"], function ($) {

	// Register special pre filter for x-domain requests with alternative data type
	$.ajaxPrefilter(function (options) {
		return options.crossDomain && options.dataTypeCrossDomain;
	});

	function wrap(name) {
		return function (data, options) {
			return $.tmpl(name, data, options);
		};
	}

	return {
		normalize: function (name, normalize) {
			return normalize(name, "", true)
				.replace(/(\.tmpl\.html)$/, "");
		},
		load: function (name, req, load) {
			if ($.template[name]) {
				load(wrap(name));
			}
			else {
				$.ajax({
					// Full url
					url: req.toUrl(name + ".tmpl.html"),

					// Cache request in browser
					cache: true,

					// Load as JSON
					dataType: "text",

					// Use JSONP if this cross domain request
					dataTypeCrossDomain: "jsonp",

					// Specified callback name is required to enable caching
					jsonpCallback: encodeURIComponent(name)
				})
					.done(function (data) {
						var tmpl = $.template(name, data);

						/* >>>> DEPRECATED >>>> */
						$.template[name.replace(/\//g, ".")] = tmpl;
						/* <<<< DEPRECATED <<<< */

						load(wrap(name));
					});
			}
		}
	};
});