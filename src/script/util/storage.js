/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/storage
 */

define("util/storage", ["module", "util/json", "jquery", "jquery/cookie"], function (mod, json, $) {

	var window = this,

		is = {
			local: false,
			session: false
		},

		module = {
			config: $.extend({
				namespace: ""
			}, mod.config())
		};

	$.each(["local", "session"], function (i, type) {
		var typeName = type + "Storage";

		// Firefox die, if cookies are disabled in privacy settings
		try {
			is[type] = window[typeName] && window[typeName].setItem;
		}
		catch (error) {}

		module[type + "Storage"] = function (name, value) {
			name = module.config.namespace + name;

			if (value === undefined) {
				var ret = is[type] ? window[typeName].getItem(name) : $.cookie(type + ":" + name);
				return (ret === undefined || ret === null) ? null : json.decode(ret);
			}
			else if (value === null) {
				if (is[type]) {
					window[typeName].removeItem(name);
				}
				else {
					$.cookie(type + ":" + name, null, {
						path: "/",
						domain: document.domain,
						expires: -365
					});
				}
				return this;
			}
			else {
				value = json.encode(value);
				if (is[type]) {
					window[typeName].setItem(name, value);
				}
				else {
					$.cookie(type + ":" + name, value, {
						path: "/",
						domain: document.domain,
						expires: type === "localStorage" ? 365 : undefined
					});
				}
				return this;
			}
		};

		module[type + "Clear"] = function (deep) {
			var reg = new RegExp("^" + (is[type] ? "" : type + ":") + (deep ? "" : module.config.namespace), "");

			if (is[type]) {
				if (deep) {
					window[typeName].clear();
				}
				else {
					for (var name in window[typeName]) {
						if (reg.test(name)) {
							window[typeName].removeItem(name);
						}
					}
				}
			}
			else {
				if (document.cookie && document.cookie !== "") {
					$.each(document.cookie.split(";"), function (i, cookieItem) {
						if (reg.test(cookieItem = $.trim(cookieItem))) {
							$.cookie(cookieItem.substr(0, cookieItem.indexOf("=")), null, {
								path: "/",
								domain: document.domain,
								expires: -365
							});
						}
					});
				}
			}

			return this;
		};

	});

	return module;

});