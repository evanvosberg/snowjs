/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license         Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/ui/datepicker/i18n
 */

define("jquery/ui/datepicker/i18n", ["jquery", "jquery/i18n", "jquery/ui/datepicker"], function ($, undefined) {

	var _fnDatepicker = $.fn.datepicker;

	$.fn.datepicker = function () {
		var args = arguments,
			region,
			calendar,
			index;

		if (args[0] && (region = args[0].region)) {
			index = 0;
		}
		else {
			if (args[1] === "region" && (region = args[2])) {
				args[1] = {
					region: region
				};
				Array.prototype.pop.call(args);
			}
			if (args[1] && (region = args[1].region)) {
				index = 1;
			}
		}
		if (region && (calendar = ($.i18n.regions[region] || {})
			.calendar)) {
			args[index] = $.extend({
				dayNames: calendar.days.names,
				dayNamesMin: calendar.days.namesShort,
				dayNamesShort: calendar.days.namesAbbr,
				monthNames: calendar.months.names,
				monthNamesShort: calendar.months.namesAbbr,
				firstDay: calendar.firstDay,
				shortYearCutoff: "+" + (calendar.twoDigitYearMax - new Date()
					.getFullYear()),
				dateFormat: calendar.patterns.d.replace(/dddd/, "DD")
					.replace(/ddd/, "D")
					.replace(/MMMM/, "@@")
					.replace(/MMM/, "@")
					.replace(/MM/, "mm")
					.replace(/M/, "m")
					.replace(/@@/, "MM")
					.replace(/@/, "M")
					.replace(/yyyy/, "@@")
					.replace(/yy/, "y")
					.replace(/@@/, "yy")
			}, args[index]);
		}

		return _fnDatepicker.apply(this, args);
	};

	return $;
});