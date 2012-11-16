/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/scope
 */

define("util/scope", [], function () {

	return function (scope, context) {
		context = context || window;

		var parts = scope ? scope.split(/\./) : [];

		for (var i = 0, l = parts.length; i < l; i++) {
			context = context[parts[i]] || (context[parts[i]] = {});
		}

		return context;
	};

});