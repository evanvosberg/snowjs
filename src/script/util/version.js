/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/version
 */

define("util/version", ["module", "jquery"], function (mod, $) {

	var splitExp = /(\d+)\s*([a-z]+)(\.?)/ig,
		commaExp = /,/g,
		spaceExp = / /g,
		integExp = /(\D|^$)/,

		split = function (val) {
			return (val + "")
				.toLowerCase()
				.replace(splitExp, function (all, $1, $2, $3) {
					return $1 + "." + $2 + $3;
				})
				.replace(commaExp, ".")
				.replace(spaceExp, "")
				.split(".");
		},

		toInt = function (val) {
			return parseInt(integExp.test(val) ? (module.config[val] || 0) : val, 10);
		},

		module = {

			config: $.extend({
				alpha: -10,
				a: -10,
				beta: -8,
				b: -8,
				release: -2,
				r: -2,
				rc: -4
			}, mod.config()),

			compare: function (versionA, versionB) {
				var stackA = split(versionA),
					stackB = split(versionB),
					l = Math.max(stackA.length, stackB.length),
					valA,
					valB;

				for (var i = 0; i < l; i++) {
					valA = toInt(stackA[i]);
					valB = toInt(stackB[i]);

					if (valA !== valB) {
						break;
					}
				}

				return valA > valB ? 1 : valA === valB ? 0 : -1;
			}
		};

	return module;

});