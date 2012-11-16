/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/equalsize
 */

define("jquery/fn/equalsize", ["jquery"], function ($, undefined) {

	$.each(["Height", "Width"], function (i, Name) {

		// Height => height
		var name = Name.toLowerCase();

		$.each(["", "Inner", "Outer"], function (j, Type) {

			// Outer => outer
			var type = Type.toLowerCase();

			// $.fn[ "equal" + "Outer" + "Height" ]
			$.fn["equal" + Type + Name] = function (margin) {

				margin = Type === "Outer" ? margin : undefined;

				// OuterHeight || height
				var method = Type ? type + Name : name,
					max = 0;

				return this.each(function () {
					var height = margin ? $(this)[method](true) : $(this)[method]();

					if (height > max) {
						max = height;
					}

				})[method](max, margin);
			};
		});
	});
});