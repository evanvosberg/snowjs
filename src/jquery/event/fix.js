/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/event/fix
 */

define("jquery/event/fix", ["jquery"], function ($) {

	var _fix = $.event.fix;

	$.extend($.event, {
		fix: function (event) {
			var originalEvent = event;

			// run  the original fix method
			event = _fix.call($.event, event);

			// Add originalTarget, if necessary
			if (!event.originalTarget) {
				event.originalTarget = originalEvent.srcElement || event.target;
			}

			// be sure touches isn't undefined
			// Calculate pageX/Y if missing and touches[0] available
			if ((event.touches = originalEvent.touches || {
				length: 0
			})
				.length) {
				event.pageX = event.touches[0].pageX;
				event.pageY = event.touches[0].pageY;
			}
			// Calculate pageX/Y and touches[0] if missing and touch available
			else if (originalEvent.touch) {
				event.touches = {
					0: originalEvent.touch,
					length: 1
				};
				event.pageX = originalEvent.touch.pageX;
				event.pageY = originalEvent.touch.pageY;
			}

			return event;
		}
	});

});