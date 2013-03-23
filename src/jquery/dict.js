/*
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/dict
 */

define("jquery/dict", ["module", "jquery"], function (mod, $, undefined) {

	// Get scope of regional dictionaries
	var dictsByRegion = function (region) {
			return $.dict[region] || ($.dict[region] = {});
		},

		// Text replace
		parseNode = function (node, dict, deep) {
			if (node.nodeType === 3) {
				node.nodeValue = dict.parse(node.nodeValue);
			}
			else if (deep) {
				$.each(node.childNodes, function () {
					parseNode(this, dict, deep);
				});
			}
		},
		
		config = $.dictSettings = $.extend({
			parser: /(?:^|[^\{\$])(\{(.*?[^\\])\})/g,
			region: "en"
		}, mod.config());

	$.extend({
		// Get already defined dictionary
		dict: function (dict, options) {
			// Merge given options with defaults
			var o = $.extend({}, config, typeof options === "string" ? {
					region: options
				} : options),
				// Regional dictionaries scope
				dicts = dictsByRegion(o.region),
				// Dictionary data
				data;

			if (typeof dict === "string") {
				data = dicts[dict] || {};
			}
			else {
				data = dict || {};
			}

			// Results a dictionary instance
			return new $.Dictionary(data, o);
		},

		// Build dictionary by various data
		dictionary: function (dict, data, options) {
			// Anonymous dictionary
			if (typeof dict !== "string") {
				options = data;
				data = dict;
				dict = undefined;
			}
			// Don't overwrite existing dictionary, just extend it
			else {
				data.unshift(dict);
			}

			// Merge given options with defaults
			var o = $.extend({}, config, typeof options === "string" ? {
					region: options
				} : options),
				// Regional dictionaries scope
				dicts = dictsByRegion(o.region),
				// Base stack to merge dictionaries to a single one
				mixed = [{}];

			// create stack
			$.each(data, function (i, item) {
				// Mix in
				if ($.isPlainObject(item)) {
					mixed.push(item);
				}
				// Mix in already defined dictionary by name
				else if (typeof item === "string") {
					mixed.push(dicts[item] || {});
				}
				// Mix in dictionary instances (only with same region)
				else if (item instanceof $.Dictionary && item.options.region === o.region) {
					mixed.push(item.dict);
				}
			});

			// Merge stack into single data object
			mixed = $.extend.apply($, mixed);

			// Results a dictionary instance
			return new $.Dictionary(dict ? (dicts[dict] = mixed) : mixed, o);
		},

		// Dictionary class
		Dictionary: function (dict, options) {
			this.dict = dict;
			this.options = options;
		}
	});

	// Class methods of dict
	$.extend($.Dictionary.prototype, {
		// Translate by key word, run parse as fall back
		translate: function (key) {
			return this.dict[key] || this.parse(key);
		},

		// Parse translation key word in string
		parse: function (string) {
			var dict = this.dict;

			return string.replace(this.options.parser, function (all, $1, $2) {
				var ret = dict[$2];

				return ret === undefined ? all : all.replace($1, ret);
			});
		}
	});

	// Add dictionary as dom manipulation method
	$.fn.extend({
		dictParse: function (dict, deep, options) {
			// Init recursive parsing
			if (typeof deep !== "boolean") {
				options = deep;
				deep = false;
			}

			// Init dict object
			dict = dict instanceof $.Dictionary ? dict : $.dict(dict, options);

			// Parse DOM content
			return this.contents()
				.each(function () {
					parseNode(this, dict, deep);
				}), this;
		}
	});

	return $;
});