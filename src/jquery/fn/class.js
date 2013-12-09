/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/class
 */

define("jquery/fn/class", ["jquery"], function ($) {

	var _hasClass = $.fn.hasClass,
		_removeClass = $.fn.removeClass;

	$.fn.extend({
		hasClass: function (classes) {
			if ($.type(classes) === "regexp") {
				return classes.test($(this[0])
					.attr("class") || "");
			}
			else {
				return _hasClass.call(this, classes);
			}
		},
		removeClass: function (classes) {
			if ($.type(classes) === "regexp") {
				this.each(function () {
					var elem = $(this);

					$.each((elem.attr("class") || "").split(/\s+/g), function (i, name) {
						if (classes.test(name)) {
							_removeClass.call(elem, name);
						}
					});

				});
			}
			else {
				_removeClass.call(this, classes);
			}

			return this;
		}
	});

	return $;
});