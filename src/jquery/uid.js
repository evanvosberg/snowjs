/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/uid
 */

define("jquery/uid", ["jquery"], function ($) {

	$.extend({
		uid: function (prefix) {

			prefix = prefix ? prefix + "_" : "uid_";

			var generate = function () {
					var uid = prefix + $.guid++;

					return document.getElementById(uid) ? generate() : uid;
				};

			return generate();
		}
	});

	return $;
});