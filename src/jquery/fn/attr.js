/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/attr
 */

define("jquery/fn/attr", ["jquery"], function ($) {

	$.fn.extend({

		// Toggle an attribute, works like toggleClass
		toggleAttr: function (attr, valA, valB) {
			return this.each(

			function () {
				var element = $(this),
					val = element.attr(attr);

				if (val === valA && valB === undefined) {
					element.removeAttr(attr);
				}
				else if (val === valA) {
					element.attr(attr, valB);
				}
				else {
					element.attr(attr, valA);
				}
			});
		}
	});

	return $;
});