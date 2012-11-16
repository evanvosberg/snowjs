/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/param
 */

define("jquery/param", ["jquery"], function ($) {

	var _param = $.param;

	$.extend({
		// param is also (un)param
		param: function (obj, traditional) {
			var ret;

			if (typeof obj === "string") {
				ret = {};

				var pairs = obj.replace(/^(\?)/, "")
						.split("&");

				$.each(pairs, function (i, pair) {
					pair = pair.split("=");

					var registers = [],
						name = decodeURIComponent(pair[0]),
						value = decodeURIComponent(pair[1] || ""),
						tmp = ret,
						register;

					name = name.replace(/\[([^\]]*)\]/g, function (all, $1) {
						registers.push($1);
						return "";
					});

					registers.unshift(name);

					for (var j = 0, l = registers.length - 1; j < l; j++) {
						register = registers[j];

						var next = registers[j + 1];

						if (!tmp[register]) {
							tmp[register] = next === "" || (/^[0-9]+$/)
								.test(next) ? [] : {};
						}

						tmp = tmp[register];
					}

					register = registers[l];

					if (register === "") {
						tmp.push(value);
					}
					else {
						tmp[register] = value;
					}
				});
			}
			else if (obj) {
				ret = _param(obj, traditional);
			}

			return ret;
		}
	});

});