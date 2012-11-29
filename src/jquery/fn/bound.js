/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/bound
 */

define("jquery/fn/bound", ["jquery"], function ($, undefined) {

	$.fn.bound = function (events, callback) {

		var eventMap = {};

		$.each($.trim(events)
			.replace(/\s+/, " ")
			.split(" "), function (i, eventName) {
			var evt = eventName.split(".");
			eventMap[evt[0]] = evt[1] || "";
		});

		return this.each(function (i, node) {
			// Each event of current element in set
			$.each($._data(this, "events") || [], function (type, handlers) {
				// Each handlers of current event type
				$.each(handlers, function (j, handler) {
					var type = handler.origType,
						namespace = eventMap[type] !== undefined ? eventMap[type] : eventMap["*"];
					// If handler namespace
					if (namespace !== undefined && (!namespace || namespace === handler.namespace)) {
						// Call
						callback.call(node, i, handler);
					}
				});
			});
		});
	};

	return $;
});