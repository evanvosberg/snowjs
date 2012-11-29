/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/text
 */

define("jquery/fn/text", ["jquery"], function ($, undefined) {

	var _fnText = $.fn.text;

	$.fn.extend({
		text: function (value) {
			var ret = [];

			if (value === true) {
				$.each(this[0] ? this[0].childNodes : [], function () {
					var type = this.nodeType;

					if (type === 3 || type === 8) {
						ret.push(this.nodeValue);
					}
				});
				ret = ret.join(" ");
			}
			else {
				ret = (value === undefined || value === false) ? _fnText.call(this) : _fnText.call(this, value);
			}

			return ret;
		}
	});

	return $;
});