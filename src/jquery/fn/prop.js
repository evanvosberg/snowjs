/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/prop
 */

define("jquery/fn/prop", ["jquery"], function ($, undefined) {

	$.fn.extend({

		// Toggle a property, works like toggleClass
		toggleProp: function (prop, valA, valB) {
			return this.each(

			function () {
				var element = $(this),
					val = element.prop(prop);

				if (val === valA && valB === undefined) {
					element.removeProp(prop);
				}
				else if (val === valA) {
					element.prop(prop, valB);
				}
				else {
					element.prop(prop, valA);
				}
			});
		}
	});

	return $;
});