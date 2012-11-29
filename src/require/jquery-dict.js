/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			require/jquery-dict
 */

define("require/jquery-dict", ["jquery/dict"], function ($) {

	// Register special pre filter for x-domain requests with alternative data type
	$.ajaxPrefilter(function (options) {
		return options.crossDomain && options.dataTypeCrossDomain;
	});

	var
		// Find region in url (absolute path module)
		regionUrlExp = /^(?:[^#|\?]*?)\.((?:[a-z]{2})(?:(?:(?:\-[A-Z][a-z]{1,3})?\-[A-Z]{2})?))(?:[^\/\w]|$)/,

		// Find region in module name
		regionModuleExp = /\.((?:[a-z]{2})(?:(?:(?:\-[A-Z][a-z]{1,3})?\-[A-Z]{2})?))$/,

		// Check dictionary is already defined
		defined = function (dict) {
			return !!($.dict[dict.region] && $.dict[dict.region][dict.name]);
		};

	// Expose jquery-dict loader plugin module
	return {
		info: function (id) {
			var
				// Is already cached?
				result = this.info[id],

				// Dictionary name without region
				name,

				// Dictionary region
				region,

				// Url to load dictionary
				url;

			if (!result) {
				if (require.jsExtRegExp.test(id)) {
					region = (region = regionUrlExp.exec(id)) && region[1];
					url = (id += (region ? "" : (id.indexOf("?") === -1 ? "?" : "&") + "region=" + (region = $.dictSettings.region)));
					name = id.replace(regionUrlExp, "");
				}
				else {
					region = (region = regionModuleExp.exec(id)) && region[1];
					url = (id += (region ? "" : "." + (region = $.dictSettings.region))) + ".json";
					name = id.replace(regionModuleExp, "");
				}

				// Cache dictionary info object
				result = this.info[id] || (this.info[id] = {
					name: name,
					id: id,
					region: region,
					url: url
				});
			}

			return result;
		},

		normalize: function (name, normalize) {
			return this.info(normalize(name, "", true))
				.id;
		},

		load: function (name, req, load) {
			var
				// Reference scope object
				self = this,

				// Dictionary info
				dict = self.info(name);

			if (defined(dict)) {
				load($.dict(dict.name, {
					region: dict.region
				}));
			}
			else {
				$.ajax({
					// Full url
					url: req.toUrl(dict.url),
					// Cache request in browser
					cache: true,
					// Load as JSON
					dataType: "json",
					// Use JSONP if this cross domain request
					dataTypeCrossDomain: "jsonp",
					// Specified callback name is required to enable caching
					jsonpCallback: encodeURIComponent(dict.name)
				})
					.done(function (data) {
						if (data instanceof Array) {
							var depends = [];

							// Check and build dictionary dependencies
							$.each(data, function (i, subName) {
								if (typeof subName === "string") {
									var subDict = self.info(subName + "." + dict.region);

									if (!defined(subDict) && !req.defined(subDict.id) && !req.specified(subDict.id)) {
										depends.push("require/jquery-dict!" + subDict.id);
									}
								}
							});

							// Load base dictionaries to inherit
							if (depends.length) {
								return require(depends, function () {
									// Expose dictionary instance as module object
									load($.dictionary(dict.name, data, dict.region));
								});
							}

						}
						else {
							// Change dictionary data into data stack
							data = [data];
						}

						// Expose dictionary instance as module object
						load($.dictionary(dict.name, data, dict.region));
					});
			}
		}
	};
});