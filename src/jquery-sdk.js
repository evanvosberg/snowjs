/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery-sdk
 */

/*global jQuery*/

(function ($, undefined) {

	//
	// Helper
	//

	var
		// Convert jQuery SDK plugin name to requirejs module id
		pluginToModule = function (pluginName) {
			return (pluginName + "")
			// Convert dots into slashes (directory paths)
			.replace(/\./g, "/")
			// Convert jQuery to lower case
			.replace(/^jQuery/, "jquery")
			// Remove boolean true / false statements
			.replace(/^(true|false)$/, "")
			// Move region of dictionaries to the end
			.replace(/^((?:[a-z]{2})(?:(?:(?:\-[A-Z][a-z]{1,3})?\-[A-Z]{2})?)):(.*?)$/, "$2.$1");
		},

		// Convert requirejs module id to jQuery SDK plugin name
		moduleToPlugin = function (moduleName) {
			return (moduleName + "")
				.replace(/^jquery/, "jQuery")
				.replace(/\//g, ".");
		};



	//
	// Backward compatibility API
	//

	var
		// Save original method
		ready = $.ready,

		// Save original method
		readyPromise = $.ready.promise,

		// Config from script
		scriptConfig = window.jQueryConfig && !window.jQueryConfig.nodeName ? window.jQueryConfig : undefined,

		// Config from meta tag
		metaConfig = $("meta[name=jQueryConfig]")
			.attr("content"),

		// Extend jQuery.config
		config = (function () {
			/*jshint evil:true*/
			return $.extend(true, {}, scriptConfig, (metaConfig ? eval("(" + metaConfig + ")") : undefined));
		}()),

		// Type of dependencies ready data
		typeExp = /^(string|object|array)$/,

		// Type of plugin dependencies
		pluginExp = /(string|array)/,

		dependMap = {
			"plugin": "",
			"script": "script!",
			"dict": "$dict!",
			"DOM": "$ready!",
			"i18n": "$i18n!",
			"tmpl": "$tmpl!"
		},

		// Convert dependencies for requirejs
		dependControl = function (depends, callback, type, name) {
			var deferred = $.Deferred(),
				promise = deferred.promise(),
				requireDepends = [],
				requireCallback = function () {
					var module;

					if (callback) {
						module = callback.call(promise, $);
					}

					deferred.resolve($);

					return module;
				};

			// May not have dependencies
			if (!callback) {
				callback = depends;
				depends = {};
			}

			// Normalize dependencies
			depends = pluginExp.test($.type(depends)) ? {
				plugin: depends
			} : depends;

			// Add dependencies to deferredStack
			$.each(depends, function (dependType, dependTypeDepends) {
				dependType = dependMap[dependType];

				$.each($.isArray(dependTypeDepends) ? dependTypeDepends : [dependTypeDepends], function (i, depend) {
					requireDepends.push(dependType + pluginToModule(depend));
				});
			});

			if (name) {
				var moduleId = dependMap[type] + pluginToModule(name);
				// Define module
				define(moduleId, requireDepends, requireCallback);
				// Trigger exec of callback
				require([moduleId]);
			}
			else {
				require(requireDepends, requireCallback);
			}

			return promise;
		},

		// Local alias of console
		_console = window.console;

	// Run config for ajax
	$.extend($.ajaxSettings, config.ajax);

	// Run config for noConflict mode
	if (config.noConflict) {
		var alias = $.noConflict();
		if (typeof config.noConflict === "string") {
			window[config.noConflict] = alias;
		}
	}

	$.extend({
		// jQuery.config
		config: config,

		// jQuery.debug
		debug: {
			// jQuery.debug.warn()
			warn: _console && $.isFunction(_console.warn) ? function () {
				_console.warn.apply(_console, arguments);
			} : $.noop
		},

		// jQuery.plugin()
		plugin: function (name, depends, callback) {
			return dependControl(depends, callback, "plugin", name);
		},

		// jQuery.provide()
		provide: function (name, depends, callback) {
			return dependControl(depends, callback, "script", name);
		},

		// jQuery.ready()
		ready: function (depends, callback) {
			var type = $.type(depends);

			if (typeExp.test(type)) {
				return dependControl(depends, callback || $.noop);
			}
			else {
				return type === "function" ? readyPromise()
					.done(depends) : ready(depends);
			}
		},

		// jQuery.scope()
		scope: function (scope, context) {
			var parts = scope ? scope.split(/\./) : [];

			context = context || window;

			for (var i = 0, l = parts.length; i < l; i++) {
				context = context[parts[i]] || (context[parts[i]] = {});
			}

			return context;
		}
	});

	jQuery.fn.extend({
		// .jquerysdk --> Version
		jquerysdk: "1.4",

		// .sub() --> provide subclass switch as prototype method
		sub: function (jQuerySubclass) {
			return (typeof jQuerySubclass === "string" ? window[jQuerySubclass] : jQuerySubclass)(this);
		}
	});

	// Redefine original ready promise
	$.ready.promise = readyPromise;

	// Define module
	define("jquery-sdk", ["jquery"], function ($) {
		return $;
	});

	// Trigger callback execution of module
	require(["jquery-sdk"]);



	//
	// Backward compatible plugins
	//

	var
		// Generate warn message for plugins which are replaced by an other module
		messageReplacedBy = function (moduleName, moduleDepend) {
			return "'" + moduleToPlugin(moduleName) + "' is replaced by module '" + moduleDepend + "'";
		},

		// Generate warn message for plugins which are already included in module jQuery
		messageSupportedBy = function (moduleName) {
			return "Now methods of '" + moduleToPlugin(moduleName) + "' supported by module 'jquery'";
		},

		// Configure redirect paths
		requireConfig = {
			paths: {
				"jQuery": "jquery",
				"jquery/fn/scrollTo": "jquery/fn/scrollto",
				"jquery/fn/equalSize": "jquery/fn/equalsize"
			},
			config: {

			}
		};

	// Setup backward compatible config
	$.each({
		"ajax": "jquery-sdk",
		"compareVersion": "util/version",
		"dict": "jquery/dict",
		"i18n": "jquery/i18n",
		"metaparse": "jquery/metaparse",
		"mime": "util/mime",
		"noConflict": "jquery-sdk",
		"shrink": "util/string.shrink",
		"storage": "util/storage"
	}, function (configName, moduleId) {
		var config = $.config[configName];

		if (config) {
			$.debug.warn("DEPRECATED: use 'module config of requirejs' instead of 'jQueryConfig." + configName + "'.");
			$.extend($.scope(moduleId, requireConfig.config), config);
		}
	});

	// Setup requirejs
	require(requireConfig);

	// Setup backward compatible modules
	$.each({
		"jquery/array": [messageReplacedBy, "util/array", function ($, array) {
			$.unsplice = array.unsplice;
		}],

		"jquery/base64": [messageReplacedBy, "util/base64", function ($, base64) {
			$.toBASE64 = $.encodeBASE64 = base64.encode;
			$.fromBASE64 = $.decodeBASE64 = base64.decode;
		}],

		"jquery/base64/fix": [undefined, "jquery/base64"],

		"jquery/core": [undefined, undefined, function ($) {
			return $;
		}],

		"jquery/class": [messageReplacedBy, "class", function ($, Class) {
			$.Class = Class;
			$.isClass = Class.isClass;
		}],

		"jquery/compareVersion": [messageReplacedBy, "util/version", function ($, version) {
			$.compareVersionSettings = $.extend(version.config, $.config.compareVersion);
			$.compareVersion = version.compare;
		}],

		"jquery/css/borderradius": [messageSupportedBy],

		"jquery/debug/sortPlugins": ["jQuery.debug.sortPlugins' was canceled entirely.", undefined, function ($) {
			$.debug.sortPlugins = $.noop;
		}],

		"jquery/fn/size": [messageSupportedBy],

		"jquery/json": [messageReplacedBy, "util/json", function ($, json) {
			$.fromJSON = $.parseJSON;
			$.toJSON = json.encode;
		}],

		"jquery/json/fix": [undefined, "jquery/json"],

		"jquery/md5": [messageReplacedBy, "util/md5", function ($, md5) {
			$.md5 = md5;
		}],

		"jquery/mime": [messageReplacedBy, "util/mime", function ($, mime) {
			$.mime = mime.mime;
			$.mimeSettings = $.extend(true, mime.config, $.config.mime);
		}],

		"jquery/scope": [messageReplacedBy, "util/scope"],

		"jquery/storage": [messageReplacedBy, "util/storage", function ($, storage) {
			$.each(["local", "session"], function (i, type) {
				$[type + "Storage"] = storage[type + "Storage"];
				$[type + "StorageClear"] = storage[type + "Clear"];
				$[type + "StorageSettings"] = $.extend(storage.config, $.config.storage);
			});
		}],

		"jquery/string": [messageReplacedBy, "util/string", function ($, string) {
			$.reverse = string.reverse;
			$.escExpStr = string.escExpStr;
			$.stripTags = string.stripTags;
			$.htmlspecialchars = string.htmlspecialchars;
			$.shrinkSetting = $.extend(string.config.shrink, $.config.shrink);
			$.shrink = string.shrink;
		}],

		"jquery/support/cssprefix": [messageSupportedBy],

		"jquery/support/flash": [messageReplacedBy, "util/string", function ($, support) {
			$.support.flash = support.flash;
		}],

		"jquery/support/multipleUpload": [messageReplacedBy, "util/string", function ($, support) {
			$.support.multipleUpload = support.inputFileMultipleAttr;
		}],

		"jquery/support/placeholder": [messageReplacedBy, "util/string", function ($, support) {
			$.support.inputPlaceholderAttr = support.placeholder;
		}],

		"jquery/support/touch": [messageReplacedBy, "util/string", function ($, support) {
			$.support.touch = support.touchEvents;
		}],

		"jquery/utf8": [messageReplacedBy, "util/utf8", function ($, utf8) {
			$.toUTF8 = $.encodeUTF8 = utf8.encode;
			$.fromUTF8 = $.decodeUTF8 = utf8.decode;
		}]
	}, function (moduleId, moduleData) {
		var moduleMessage = moduleData[0],
			moduleDepend = moduleData[1],
			moduleCallback = moduleData[2];

		define(moduleId, ["jquery-sdk"].concat(moduleDepend ? [moduleDepend] : []), function ($) {
			if (moduleMessage) {
				$.debug.warn("DEPRECATED: " + ($.isFunction(moduleMessage) ? moduleMessage(moduleId, moduleDepend) : moduleMessage));
			}
			if (moduleCallback) {
				return moduleCallback.apply(moduleCallback, arguments);
			}
		});
	});

}(jQuery));