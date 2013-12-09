/*
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @based			Microsoft Open Source jQuery Globalization Plugin (http://github.com/nje/jquery-glob)
 *
 * @module			jquery/i18n
 */

(function (undefined) {

	// alias of jQuery
	var $,

		// Module object
		module,

		// Helper script id
		helperId = "$pub!__i18n__",

		// Define the helper
		helperDefine = function () {
			define(helperId, [], function () {

			});
		},

		// Module id/path
		moduleId = "jquery/i18n",

		// Define the module
		moduleDefine = function () {
			define("jquery/i18n", ["jquery", helperId], function ($) {
				return $;
			});
		},

		// Load extened module dependencies
		moduleDepends = function (dependencies) {
			var when = [];

			$.each(dependencies, function (i, name) {
				if (!module[(/^[A-Z]+$/)
					.test(name) ? "currencies" : "regions"][name]) {
					when.push($.ajax({
						// Full url
						url: require.toUrl(moduleConfig.path + "/" + name + ".js"),

						// Cache request in browser
						cache: true,

						// Load as Javascript
						dataType: "script"
					}));
				}
			});

			// Define helper when dependencies loaded;
			$.when.apply($, when)
				.done(helperDefine);
		},

		// Config settings of the module
		moduleConfig;

	// Initialize i18n for jQuery
	require(["jquery"], function (jQuery) {

		// Expose local alias of jQuery
		$ = jQuery;

		// Read module config
		// - Hack to access the module config
		// - In future hopefully it's possible to get access via a global .config method
		// - Example: moduleConfig =  req.config("config")[moduleId] || {}
		moduleConfig = require.s.contexts._.config.config[moduleId] || {};

		var
			// Default regions and currencies are dependencies for the module
			dependencies = [],

			// Map of format shortcuts
			typeMap = {
				"date": "d",
				"dateLong": "D",
				"dateLong-time": "f",
				"dateLong-timeLong": "F",
				"date-time": "l",
				"date-timeLong": "L",
				"time": "t",
				"timeLong": "T",
				"currency": "c",
				"number": "n",
				"percent": "p"
			},

			shortTypeExp = /[dDfFlLtTcnp]/,

			nTypeExp = /[cnp]/,

			curSymbolExp = /\$/,

			escRegexpExp = /([\.$?*|{}\(\)\[\]\\\/\+\^])/g,

			dayPartRegExp = /([^d]|^)(d|dd)([^d]|$)/g,

			infinityExp = /^[+\-]?infinity$/i,

			hexExp = /^0x[a-f0-9]+$/i,

			parseFloatExp = /^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/,

			// Regular expression for matching date and time tokens in format strings.
			tokenDateExp = /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|W|zzz|zz|z|gg|g/g,

			// Regular expression for matching number tokens in format strings.
			tokenNumberExp = /(c\d*|n\d*|p\d*)/g,

			expandFormatExp = /([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,

			expandSplitExp = /e/i,

			numberTypeExp = /(c|n|p)(\d*)/,

			whiteSpaceExp = /\s+/g,

			cSymbolStrictExp = /(\s*)(\\\$)(\s*)/g,

			cSymbolExp = /\\\$/g,

			pSymbolStrictExp = /(\s*)(%)(\s*)/g,

			pSymbolExp = /%/g,

			nSymbolExp = /n/,

			positiveNumberExp = /[1-9]/,

			altGroupExp = /\u00A0/g,

			patternPartsExp = /n|\$|-|%/g,

			// Build region data object
			regionBuild = function (self, options) {
				var o = $.extend({}, self.settings, options),
					region = module.regions[o.region] || module.regions.en,
					currencies = region.numberFormat.currencies;

				// If a special currency selected
				if (o.currency) {
					var cGlob = module.currencies[o.currency],
						cExtd = currencies[o.currency];

					// Merge special currency with standart currency
					if (!cExtd && cGlob) {
						cExtd = region.numberFormat.currencies[o.currency] = $.extend({}, currencies[""]);
						cExtd.pattern = $.merge($.merge([], cExtd.pattern), cGlob.pattern);
						cExtd.symbol = cGlob.symbol;
						cExtd.decimals = cGlob.decimals;
					}
				}

				// Set current used currency and calendar
				region.numberFormat.currency = currencies[o.currency] || currencies[""];
				region.calendar = region.calendars[o.calendar] || region.calendars.standart;

				return region;
			},

			// Quick i18n call
			quick = function (type, value, options) {
				type = typeMap[type] || type;

				if (!shortTypeExp.test(type)) {
					return null;
				}
				else if (typeof value === "string") {
					if (nTypeExp.test(type)) {
						return this.parseNumber(value, 10, options);
					}
					else {
						return this.parseDate(value, type, options);
					}
				}
				else {
					return this[nTypeExp.test(type) ? "formatNumber" : "formatDate"](value, type, options);
				}
			},

			// Extended module methods and properties
			extended = {
				// module.expStrDate()
				expStrDate: function (format, strict, options) {
					if (typeof strict !== "boolean") {
						options = strict;
						strict = false;
					}
					var region = regionBuild(this, options),
						ret = getParseRegExp(region.calendar, format, strict)
							.regExp;
					return ret.substr(1, ret.length - 2);
				},

				// module.expStrNumber()
				expStrNumber: function (format, strict, options) {
					if (typeof strict !== "boolean") {
						options = strict;
						strict = false;
					}
					var region = regionBuild(this, options),
						ret = getNumberRegExp([region.numberFormat, (options || {})
							.currency], format, strict)
							.regExp;
					return ret.substr(1, ret.length - 2);
				},

				// module.formatNumber()
				formatNumber: function (value, format, options) {
					var region = regionBuild(this, options);
					return formatNumber(value, format, region);
				},

				// module.formatDate()
				formatDate: function (value, format, options) {
					var region = regionBuild(this, options);
					return formatDate(value, format, region);
				},

				// module.parseNumber()
				parseNumber: function (value, radix, options) {
					if (isNaN(radix)) {
						options = radix;
						radix = 10;
					}
					var region = regionBuild(this, options),
						ret = parseNumber(value, radix, region);
					return ret;
				},

				// module.parseDate()
				parseDate: function (value, formats, options) {
					var region = regionBuild(this, options),
						ret = parseDate(value, formats, region);
					return ret;
				},

				// module.settings
				settings: (moduleConfig = $.extend({
					path: "jquery/i18n", // path to load regions and currencies
					region: "en", // default region
					currency: "", // default currency
					calendar: "standard" // default calendar
				}, moduleConfig))
			};

		// module()
		module = $.extend(function (options) {
			if (typeof options !== "string") {
				var context = $.extend(true, function () {
						return quick.apply(context, arguments);
					}, extended, {
						settings: options
					});

				return context;
			}
			else {
				return quick.apply(module, arguments);
			}
		}, extended, {
			regions: {},
			currencies: {}
		});

		// Handle defaults and dependencies
		$.each({
			region: module.settings.region,
			currency: module.settings.currency
		}, function (type, depends) {
			if (depends) {
				// Set dafaults
				if ($.type(depends) === "array") {
					module.settings[type] = depends[0];
				}
				else {
					depends = [depends];
				}

				// Add to dependencies stack
				$.merge(dependencies, depends);
			}
		});

		// Expose i18n module to jQuery
		$.i18n = module;

		// Normalize path
		moduleConfig.path = moduleConfig.path.replace(/\/$/, "");

		// 1.	When defining a region, all fields are required except the ones stated as optional.
		// 2.	You can use $.extend to copy an existing region and provide only the differing values,
		//			a good practice since most regions do not differ too much from the 'default' region.
		//			DO use the 'default' region if you do this, as it is the only one that definitely
		//			exists.
		// 3.	Other plugins may add to the region information provided by extending it. However,
		//			that plugin may extend it prior to the region being defined, or after. Therefore,
		//			do not overwrite values that already exist when defining the baseline for a region,
		//			by extending your region object with the existing one.
		// 4.	Each region should have a ".calendars" object with at least one calendar named "standard"
		//			which serves as the default calendar in use by that region.
		// 5.	Each region should have a ".calendar" object which is the current calendar being used,
		//			it may be dynamically changed at any time to one of the calendars in ".calendars".

		// To define a region, use the following pattern, which handles defining the region based
		// on the 'default region, extending it with the existing region if it exists, and defining
		// it if it does not exist.
		// module.regions.foo = $.extend(true, $.extend(true, {}, module.regions['default'], fooRegion), module.regions.foo)

		var regions = module.regions;
		var en = regions.en = $.extend(true, {
				// A unique name for the region in the form <language code>-<country/region code>
				name: "en",
				// the name of the region in the english language
				englishName: "English",
				// the name of the region in its own language
				nativeName: "English",
				// whether the region uses right-to-left text
				isRTL: false,
				// 'language' is used for so-called "specific" regions.
				// For example, the region "es-CL" means "Spanish, in Chili".
				// It represents the Spanish-speaking region as it is in Chili,
				// which might have different formatting rules or even translations
				// than Spanish in Spain. A "neutral" region is one that is not
				// specific to a region. For example, the region "es" is the generic
				// Spanish region, which may be a more generalized version of the language
				// that may or may not be what a specific region expects.
				// For a specific region like "es-CL", the 'language' field refers to the
				// neutral, generic region information for the language it is using.
				// This is not always a simple matter of the string before the dash.
				// For example, the "zh-Hans" region is netural (Simplified Chinese).
				// And the 'zh-SG' region is Simplified Chinese in Singapore, whose lanugage
				// field is "zh-CHS", not "zh".
				// This field should be used to navigate from a specific region to it's
				// more general, neutral region. If a region is already as general as it
				// can get, the language may refer to itself.
				language: "en",
				// numberFormat defines general number formatting rules, like the digits in
				// each grouping, the group separator, and how negative numbers are displayed.
				numberFormat: {
					_parseRegExp: {},
					// [negativePattern]
					// Note, numberFormat.pattern has no 'positivePattern' unlike percent and currency,
					// but is still defined as an array for consistency with them.
					//  negativePattern: one of "(n)|-n|- n|n-|n -"
					pattern: ["-n"],
					// number of decimal places normally shown
					decimals: 2,
					// string that separates number groups, as in 1,000,000
					",": ",",
					// string that separates a number from the fractional portion, as in 1.99
					".": ".",
					// array of numbers indicating the size of each number group.
					// TODO: more detailed description and example
					groupSizes: [3],
					// symbol used for positive numbers
					"+": "+",
					// symbol used for negative numbers
					"-": "-",
					percent: {
						// [negativePattern, positivePattern]
						//		negativePattern: one of "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %"
						//		positivePattern: one of "n %|n%|%n|% n"
						pattern: ["-n %", "n %"],
						// number of decimal places normally shown
						decimals: 2,
						// array of numbers indicating the size of each number group.
						// TODO: more detailed description and example
						groupSizes: [3],
						// string that separates number groups, as in 1,000,000
						",": ",",
						// string that separates a number from the fractional portion, as in 1.99
						".": ".",
						// symbol used to represent a percentage
						symbol: "%"
					},
					currencies: {
						"": {
							// [negativePattern, positivePattern]
							//		negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
							//		positivePattern: one of "$n|n$|$ n|n $"
							pattern: ["($n)", "$n"],
							// number of decimal places normally shown
							decimals: 2,
							// array of numbers indicating the size of each number group.
							// TODO: more detailed description and example
							groupSizes: [3],
							// string that separates number groups, as in 1,000,000
							",": ",",
							// string that separates a number from the fractional portion, as in 1.99
							".": ".",
							// symbol used to represent currency
							symbol: "$"
						}
					}
				},
				// calendars defines all the possible calendars used by this region.
				// There should be at least one defined with name 'standard', and is the default
				// calendar used by the region.
				// A calendar contains information about how dates are formatted, information about
				// the calendar's eras, a standard set of the date formats,
				// translations for day and month names, and if the calendar is not based on the Gregorian
				// calendar, conversion functions to and from the Gregorian calendar.
				calendars: {
					standard: {
						// name that identifies the type of calendar this is
						name: "Gregorian_USEnglish",
						// separator of parts of a date (e.g. '/' in 11/05/1955)
						"/": "/",
						// separator of parts of a time (e.g. ':' in 05:44 PM)
						":": ":",
						// the first day of the week (0 = Sunday, 1 = Monday, etc)
						firstDay: 0,
						days: {
							// full day names
							names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
							// abbreviated day names
							namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
							// shortest day names
							namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
						},
						months: {
							// full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
							names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
							// abbreviated month names
							namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
						},
						// AM and PM designators in one of these forms:
						// The usual view, and the upper and lower case versions
						//		[standard,lowercase,uppercase]
						// The region does not use AM or PM (likely all standard date formats use 24 hour time)
						//		null
						AM: ["AM", "am", "AM"],
						PM: ["PM", "pm", "PM"],
						eras: [{
						// eras in reverse chronological order.
						// name: the name of the era in this region (e.g. A.D., C.E.)
						// start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
						// offset: offset in years from gregorian calendar
							"name": "A.D.",
							"start": null,
							"offset": 0
						}],
						// minimum of days in the first week of a year
						firstWeekMin: 1,
						// when a two digit year is given, it will never be parsed as a four digit
						// year greater than this year (in the appropriate era for the region)
						// Set it as a full year (e.g. 2031) or use an offset format starting from
						// the current year: "+19" would correspond to 2031 if the current year 2012.
						twoDigitYearMax: 2032,
						// set of predefined date and time patterns used by the region
						// these represent the format someone in this region would expect
						// to see given the portions of the date that are shown.
						patterns: {
							// short date pattern
							d: "M/d/yyyy",
							// long date pattern
							D: "dddd, MMMM dd, yyyy",
							// short time pattern
							t: "h:mm tt",
							// long time pattern
							T: "h:mm:ss tt",
							// short date, short time pattern
							l: "M/d/yyyy h:mm tt",
							// short date, long time pattern
							L: "M/d/yyyy h:mm:ss tt",
							// long date, short time pattern
							f: "dddd, MMMM dd, yyyy h:mm tt",
							// long date, long time pattern
							F: "dddd, MMMM dd, yyyy h:mm:ss tt",
							// month/day pattern
							M: "MMMM dd",
							// month/year pattern
							Y: "yyyy MMMM",
							// S is a sortable format that does not vary by region
							S: "yyyy'/'MM'/'dd' 'HH':'mm':'ss"
						}
						// optional fields for each calendar:
						/*
					monthsGenitive:
						Same as months but used when the day preceeds the month.
						Omit if the region has no genitive distinction in month names.
						For an explaination of genitive months, see http://blogs.msdn.com/michkap/archive/2004/12/25/332259.aspx
					convert:
						Allows for the support of non-gregorian based calendars. This convert object is used to
						to convert a date to and from a gregorian calendar date to handle parsing and formatting.
						The two functions:
							fromGregorian(date)
								Given the date as a parameter, return an array with parts [year, month, day]
								corresponding to the non-gregorian based year, month, and day for the calendar.
							toGregorian(year, month, day)
								Given the non-gregorian year, month, and day, return a new Date() object
								set to the corresponding date in the gregorian calendar.
					*/
					}
				}
			}, regions.en);
		en.calendar = en.calendars.standard;
		en.numberFormat.currency = en.numberFormat.currencies[""];

		// save en as defaults
		module.defaults = $.extend({}, en);

		function startsWith(value, pattern) {
			return value.indexOf(pattern) === 0;
		}

		function endsWith(value, pattern) {
			return value.substr(value.length - pattern.length) === pattern;
		}

		function zeroPad(str, count, left) {
			for (var l = str.length; l < count; l++) {
				str = (left ? ("0" + str) : (str + "0"));
			}
			return str;
		}

		function escRegexpStr(string, except) {
			return string.replace(escRegexpExp, function (ch) {
				if (except && except.indexOf(ch) !== -1) {
					return ch;
				}
				return "\\" + ch;
			});
		}

		// *************************************** Numbers ***************************************

		function parseNumber(value, radix, region) {
			var ret = NaN,
				nf = region.numberFormat,
				pattern = nf.pattern[0];

			// parse currncy and percent also
			if (new RegExp(escRegexpStr(nf.currency.symbol), "")
				.test(value)) {
				nf = nf.currency;
				pattern = $.trim(nf.pattern[0].replace(curSymbolExp, ""));
				value = value.replace(new RegExp(escRegexpStr(nf.symbol), ""), "");
			}
			else if (new RegExp(escRegexpStr(nf.percent.symbol), "")
				.test(value)) {
				nf = nf.percent;
				pattern = $.trim(nf.pattern[0].replace(curSymbolExp, ""));
				value = value.replace(new RegExp(escRegexpStr(nf.symbol), ""), "");
			}

			// $.trim leading and trailing whitespace
			value = $.trim(value);
			nf["+"] = region.numberFormat["+"];
			nf["-"] = region.numberFormat["-"];

			// allow infinity or hexidecimal
			if (infinityExp.test(value)) {
				ret = parseFloat(value, radix);
			}
			else if (!radix && hexExp.test(value)) {
				ret = parseInt(value, 16);
			}
			else {
				var signInfo = parseNegativePattern(value, nf, pattern);
				// determine sign and number
				if (signInfo[0] === "" && pattern !== "-n" && nf.pattern[2]) {
					pattern = $.trim(nf.pattern[0].replace(curSymbolExp, ""));
					signInfo = parseNegativePattern(value, nf, pattern);
				}
				// determine sign and number
				if (signInfo[0] === "" && pattern !== "-n") {
					signInfo = parseNegativePattern(value, nf, "-n");
				}
				var sign = signInfo[0],
					num = signInfo[1];

				sign = sign || "+";
				// determine exponent and number
				var exponent,
					intAndFraction,
					exponentPos = num.indexOf("e");
				if (exponentPos < 0) {
					exponentPos = num.indexOf("E");
				}
				if (exponentPos < 0) {
					intAndFraction = num;
					exponent = null;
				}
				else {
					intAndFraction = num.substr(0, exponentPos);
					exponent = num.substr(exponentPos + 1);
				}
				// determine decimal position
				var integer,
					fraction,
					decSep = nf["."],
					decimalPos = intAndFraction.indexOf(decSep);
				if (decimalPos < 0) {
					integer = intAndFraction;
					fraction = null;
				}
				else {
					integer = intAndFraction.substr(0, decimalPos);
					fraction = intAndFraction.substr(decimalPos + decSep.length);
				}
				// handle groups (e.g. 1,000,000)
				var groupSep = nf[","];
				integer = integer.split(groupSep)
					.join("");
				var altGroupSep = groupSep.replace(altGroupExp, " ");
				if (groupSep !== altGroupSep) {
					integer = integer.split(altGroupSep)
						.join("");
				}
				// build a natively parsable number string
				var p = sign + integer;
				if (fraction !== null) {
					p += "." + fraction;
				}
				if (exponent !== null) {
					// exponent itself may have a number patternd
					var expSignInfo = parseNegativePattern(exponent, nf, "-n");
					p += "e" + (expSignInfo[0] || "+") + expSignInfo[1];
				}
				if (parseFloatExp.test(p)) {
					ret = parseFloat(p);
				}
			}
			return ret;
		}

		function regexpNumber(format, length, strict) {
			var lengthInt = parseInt(length, 10);
			length = isNaN(lengthInt) ? format.decimals : lengthInt;

			var num = "\\d+(?:",
				patterns = format.pattern;


			for (var i = format.groupSizes.length - 1, l = i; i >= 0; i--) {
				var size = format.groupSizes[i];
				num += size === 0 ? "\\d*" : "(?:" + escRegexpStr(format[","]) + "?\\d{" + size + "})" + (i === l ? "*" : (i === 0 ? "{1}|(?:" + escRegexpStr(format[","]) + "?\\d{" + size + "})?" : "?"));
			}
			num += ")";

			if (length === 0) {
				num += "";
			}
			else {
				num += strict ? (escRegexpStr(format["."]) + "{1}\\d{" + length + "}") : ("(?:" + escRegexpStr(format["."]) + "{1}\\d{0," + length + "})?");
			}

			var ret = [];
			$.each(patterns, function (i, name) {
				ret.push(escRegexpStr(name)
					.replace(nSymbolExp, num));
			});
			if (patterns.length === 1) {
				ret.push(("n")
					.replace(nSymbolExp, num));
			}

			return "(" + ret.join("|") + ")";
		}

		function getNumberRegExp(nf, format, strict) {
			var c = nf[1] || "";
			nf = nf[0];
			var re = nf._parseRegExp[c];
			if (!re) {
				re = nf._parseRegExp[c] = {};
			}
			else {
				var reFormat = re[format];
				if (reFormat && reFormat.strict === strict) {
					return reFormat;
				}
			}

			var expFormat = format.replace(expandFormatExp, "\\\\$1"),
				groups = [],
				regexp = ["^"],
				index = 0,
				quoteCount = 0,
				match;

			// iterate through each date token found.
			while ((match = tokenNumberExp.exec(expFormat)) !== null) {
				var preMatch = expFormat.slice(index, match.index);
				index = tokenNumberExp.lastIndex;

				// don't replace any matches that occur inside a string literal.
				quoteCount += appendPreOrPostMatch(preMatch, regexp);
				if (quoteCount % 2) {
					regexp.push(match[0]);
					continue;
				}
				var m = numberTypeExp.exec(match[0]),
					add;

				switch (m[1]) {
					case "c":
						add = regexpNumber(nf.currency, m[2], strict)
							.replace(cSymbolStrictExp, strict ? "$1$2$3" : "\\s*$2\\s*")
							.replace(cSymbolExp, "(?:" + escRegexpStr(nf.currency.symbol) + ")" + (strict ? "" : "?"));
						break;
					case "n":
						add = regexpNumber(nf, m[2], strict);
						break;
					case "p":
						add = regexpNumber(nf.percent, m[2], strict)
							.replace(pSymbolStrictExp, strict ? "$1$2$3" : "\\s*$2\\s*")
							.replace(pSymbolExp, "(?:" + escRegexpStr(nf.percent.symbol) + ")" + (strict ? "" : "?"));
						break;
				}

				if (add) {
					regexp.push(add);
				}
				groups.push(match[0]);
			}
			appendPreOrPostMatch(expFormat.slice(index), regexp);
			regexp.push("$");

			var regexpStr = regexp.join("")
					.replace(whiteSpaceExp, "\\s+"), // allow whitespace to differ when matching formats.
				parseRegExp = {
					"regExp": regexpStr,
					"groups": groups,
					strict: strict
				},
				ret = re[format] = parseRegExp; // cache the regex for this format.
			return ret;
		}

		function expandNumber(number, precision, formatInfo) {
			var groupSizes = formatInfo.groupSizes,
				curSize = groupSizes[0],
				curGroupIndex = 1,
				factor = Math.pow(10, precision),
				rounded = Math.round(number * factor) / factor;
			if (!isFinite(rounded)) {
				rounded = number;
			}
			number = rounded;

			var numberString = number + "",
				right = "",
				split = numberString.split(expandSplitExp),
				exponent = split.length > 1 ? parseInt(split[1], 10) : 0;
			numberString = split[0];
			split = numberString.split(".");
			numberString = split[0];
			right = split.length > 1 ? split[1] : "";

			if (exponent > 0) {
				right = zeroPad(right, exponent, false);
				numberString += right.slice(0, exponent);
				right = right.substr(exponent);
			}
			else if (exponent < 0) {
				exponent = -exponent;
				numberString = zeroPad(numberString, exponent + 1);
				right = numberString.slice(-exponent, numberString.length) + right;
				numberString = numberString.slice(0, - exponent);
			}

			if (precision > 0) {
				right = formatInfo["."] + ((right.length > precision) ? right.slice(0, precision) : zeroPad(right, precision));
			}
			else {
				right = "";
			}

			var stringIndex = numberString.length - 1,
				sep = formatInfo[","],
				ret = "";

			while (stringIndex >= 0) {
				if (curSize === 0 || curSize > stringIndex) {
					return numberString.slice(0, stringIndex + 1) + (ret.length ? (sep + ret + right) : right);
				}
				ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + (ret.length ? (sep + ret) : "");

				stringIndex -= curSize;

				if (curGroupIndex < groupSizes.length) {
					curSize = groupSizes[curGroupIndex];
					curGroupIndex++;
				}
			}
			return numberString.slice(0, stringIndex + 1) + sep + ret + right;
		}

		function parseNegativePattern(value, nf, negativePattern) {
			var neg = nf["-"],
				pos = nf["+"],
				ret;
			switch (negativePattern) {
				case "n -":
					neg = " " + neg;
					pos = " " + pos;
					/*falls through*/
				case "n-":
					if (endsWith(value, neg)) {
						ret = ["-", value.substr(0, value.length - neg.length)];
					}
					else if (endsWith(value, pos)) {
						ret = ["+", value.substr(0, value.length - pos.length)];
					}
					break;
				case "- n":
					neg += " ";
					pos += " ";
					/*falls through*/
				case "-n":
					if (startsWith(value, neg)) {
						ret = ["-", value.substr(neg.length)];
					}
					else if (startsWith(value, pos)) {
						ret = ["+", value.substr(pos.length)];
					}
					break;
				case "(n)":
					if (startsWith(value, "(") && endsWith(value, ")")) {
						ret = ["-", value.substr(1, value.length - 2)];
					}
					break;
			}
			return ret || ["", value];
		}

		function formatNumber(value, format, region) {
			if (!format || format === "i") {
				return region.name.length ? value.toLocaleString() : value.toString();
			}
			format = format || "D";

			var nf = region.numberFormat,
				number = Math.abs(value),
				precision = -1,
				pattern;
			if (format.length > 1) {
				precision = parseInt(format.slice(1), 10);
			}

			var current = format.charAt(0)
					.toUpperCase(),
				formatInfo;

			switch (current) {
				case "D":
					pattern = "n";
					if (precision !== -1) {
						number = zeroPad("" + number, precision, true);
					}
					if (value < 0) {
						number = -number;
					}
					break;
				case "N":
					formatInfo = nf;
					/*falls through*/
				case "C":
					formatInfo = formatInfo || nf.currency;
					/*falls through*/
				case "P":
					formatInfo = formatInfo || nf.percent;
					pattern = value < 0 ? formatInfo.pattern[0] : (formatInfo.pattern[1] || "n");
					if (precision === -1) {
						precision = formatInfo.decimals;
					}
					number = expandNumber(number, precision, formatInfo);
					break;
				default:
					throw "Bad number format specifier: " + current;
			}

			var ret = "";
			for (;;) {
				var index = patternPartsExp.lastIndex,
					ar = patternPartsExp.exec(pattern);

				ret += pattern.slice(index, ar ? ar.index : pattern.length);

				if (!ar) {
					break;
				}

				switch (ar[0]) {
					case "n":
						ret += number;
						break;
					case "$":
						ret += nf.currency.symbol;
						break;
					case "-":
						// don't make 0 negative
						if (positiveNumberExp.test(number)) {
							ret += nf["-"];
						}
						break;
					case "%":
						ret += nf.percent.symbol;
						break;
				}
			}

			return ret;
		}

		// *************************************** Dates ***************************************

		function parseDate(value, formats, region) {
			var date,
				prop,
				patterns;

			if (formats) {
				if (typeof formats === "string") {
					formats = [formats];
				}
				if (formats.length) {
					for (var i = 0, l = formats.length; i < l; i++) {
						var format = formats[i];
						if (format) {
							date = parseExact(value, format, region);
							if (date) {
								break;
							}
						}
					}
				}
			}
			else {
				patterns = region.calendar.patterns;
				for (prop in patterns) {
					date = parseExact(value, patterns[prop], region);
					if (date) {
						break;
					}
				}
			}
			return date || null;
		}

		function outOfRange(value, low, high) {
			return value < low || value > high;
		}

		function expandYear(cal, year) {
			// expands 2-digit year into 4 digits.
			var now = new Date(),
				era = getEra(now);
			if (year < 100) {
				var twoDigitYearMax = cal.twoDigitYearMax;
				twoDigitYearMax = typeof twoDigitYearMax === "string" ? new Date()
					.getFullYear() % 100 + parseInt(twoDigitYearMax, 10) : twoDigitYearMax;
				var curr = getEraYear(now, cal, era);
				year += curr - (curr % 100);
				if (year > twoDigitYearMax) {
					year -= 100;
				}
			}
			return year;
		}

		function getEra(date, eras) {
			if (!eras) {
				return 0;
			}
			var start, ticks = date.getTime();
			for (var i = 0, l = eras.length; i < l; i++) {
				start = eras[i].start;
				if (start === null || ticks >= start) {
					return i;
				}
			}
			return 0;
		}

		function toUpper(value) {
			// 'he-IL' has non-breaking space in weekday names.
			return value.split("\u00A0")
				.join(" ")
				.toUpperCase();
		}

		function toUpperArray(arr) {
			var results = [];
			for (var i = 0, l = arr.length; i < l; i++) {
				results[i] = toUpper(arr[i]);
			}
			return results;
		}

		function getEraYear(date, cal, era, sortable) {
			var year = date.getFullYear();
			if (!sortable && cal.eras) {
				// convert normal gregorian year to era-shifted gregorian
				// year by subtracting the era offset
				year -= cal.eras[era].offset;
			}
			return year;
		}

		function getDayIndex(cal, value, abbr) {
			var ret,
				days = cal.days,
				upperDays = cal._upperDays;
			if (!upperDays) {
				cal._upperDays = upperDays = [
					toUpperArray(days.names),
					toUpperArray(days.namesAbbr),
					toUpperArray(days.namesShort)
				];
			}
			value = toUpper(value);
			if (abbr) {
				ret = $.inArray(value, upperDays[1]);
				if (ret === -1) {
					ret = $.inArray(value, upperDays[2]);
				}
			}
			else {
				ret = $.inArray(value, upperDays[0]);
			}
			return ret;
		}

		function getMonthIndex(cal, value, abbr) {
			var months = cal.months,
				monthsGen = cal.monthsGenitive || cal.months,
				upperMonths = cal._upperMonths,
				upperMonthsGen = cal._upperMonthsGen;
			if (!upperMonths) {
				cal._upperMonths = upperMonths = [
					toUpperArray(months.names),
					toUpperArray(months.namesAbbr)
				];
				cal._upperMonthsGen = upperMonthsGen = [
					toUpperArray(monthsGen.names),
					toUpperArray(monthsGen.namesAbbr)
				];
			}
			value = toUpper(value);
			var i = $.inArray(value, abbr ? upperMonths[1] : upperMonths[0]);
			if (i < 0) {
				i = $.inArray(value, abbr ? upperMonthsGen[1] : upperMonthsGen[0]);
			}
			return i;
		}

		function appendPreOrPostMatch(preMatch, strings) {
			// appends pre- and post- token match strings while removing escaped characters.
			// Returns a single quote count which is used to determine if the token occurs
			// in a string literal.
			var quoteCount = 0,
				escaped = false;
			for (var i = 0, il = preMatch.length; i < il; i++) {
				var c = preMatch.charAt(i);
				switch (c) {
					case "\'":
						if (escaped) {
							strings.push("\"");
						}
						else {
							quoteCount++;
						}
						escaped = false;
						break;
					case "\\":
						if (escaped) {
							strings.push("\\");
						}
						escaped = !escaped;
						break;
					default:
						strings.push(c);
						escaped = false;
						break;
				}
			}
			return quoteCount;
		}

		function expandFormat(cal, format) {
			// expands unspecified or single character date formats into the full pattern.
			format = format || "F";
			var pattern,
				patterns = cal.patterns,
				len = format.length;
			if (len === 1) {
				pattern = patterns[format];
				if (!pattern) {
					throw "Invalid date format string '" + format + "'.";
				}
				format = pattern;
			}
			else if (len === 2 && format.charAt(0) === "%") {
				// %X escape format -- intended as a custom format string that is only one character, not a built-in format.
				format = format.charAt(1);
			}
			return format;
		}

		function getParseRegExp(cal, format, strict) {
			// converts a format string into a regular expression with groups that
			// can be used to extract date fields from a date string.
			// check for a cached parse regex.
			var re = cal._parseRegExp;
			if (!re) {
				cal._parseRegExp = re = {};
			}
			else {
				var reFormat = re[format];
				if (reFormat && reFormat.strict === strict) {
					return reFormat;
				}
			}


			// expand single digit formats, then escape regular expression characters.
			var expFormat = expandFormat(cal, format)
					.replace(expandFormatExp, "\\\\$1"),
				regexp = ["^"],
				groups = [],
				index = 0,
				quoteCount = 0,
				match;

			// iterate through each date token found.
			while ((match = tokenDateExp.exec(expFormat)) !== null) {
				var preMatch = expFormat.slice(index, match.index);
				index = tokenDateExp.lastIndex;

				// don't replace any matches that occur inside a string literal.
				quoteCount += appendPreOrPostMatch(preMatch, regexp);
				if (quoteCount % 2) {
					regexp.push(match[0]);
					continue;
				}

				// add a regex group for the token.
				var m = match[0],
					len = m.length,
					add,
					/*jshint loopfunc:true*/
					lastSpace = function () {
						var last = regexp.length - 1;
						if (regexp[last] === " " && !strict) {
							regexp[last] = "\\s?";
						}
					},
					/*jshint loopfunc:true*/
					each = function (array, deep) {
						var arr = [];
						$.each(array, function (i, val) {
							if (deep) {
								val = val[deep];
							}
							if (val && $.type(val) === "string") {
								arr.push(escRegexpStr(val));
							}

						});
						return arr.length > 0 ? "(" + arr.join("|") + ")" : "";
					};

				switch (m) {
					case "dddd":
						add = strict ? each(cal.days.names) : each($.merge(cal.days.names, cal.days.namesAbbr));
						break;
					case "ddd":
						add = strict ? each(cal.days.namesAbbr) : each($.merge(cal.days.names, cal.days.namesAbbr));
						break;
					case "MMMM":
						add = strict ? each(cal.months.names) : each($.merge(cal.months.names, cal.months.namesAbbr));
						break;
					case "MMM":
						add = strict ? each(cal.months.namesAbbr) : each($.merge(cal.months.names, cal.months.namesAbbr));
						break;
					case "gg":
					case "g":
						lastSpace();
						add = each(cal.eras, "name");
						break;
					case "tt":
					case "t":
						lastSpace();
						add = each($.merge(cal.AM || [], cal.PM || []));
						break;
					case "f":
					case "ff":
					case "fff":
						add = "(\\d{" + len + "})";
						break;
					case "d":
						add = strict ? "([1-9]{1}|[1-2]{1}\\d{1}|3[0-1]{1})" : "(0?[1-9]{1}|[1-2]{1}\\d{1}|3[0-1]{1})";
						break;
					case "dd":
						add = strict ? "(0[1-9]{1}|[1-2]{1}\\d{1}|3[0-1]{1})" : "(0?[1-9]{1}|[1-2]{1}\\d{1}|3[0-1]{1})";
						break;
					case "M":
						add = strict ? "([1-9]{1}|1[0-2]{1})" : "(0?[1-9]{1}|1[0-2]{1})";
						break;
					case "MM":
						add = strict ? "(0[1-9]{1}|1[0-2]{1})" : "(0?[1-9]{1}|1[0-2]{1})";
						break;
					case "y":
					case "yy":
						add = strict ? "(\\d{2})" : "(\\d{2}|\\d{4})";
						break;
					case "yyyy":
						add = "(\\d{4})";
						break;
					case "h":
						add = strict ? "([1-9]{1}|1[0-2]{1})" : "(0?[1-9]{1}|1[0-2]{1})";
						break;
					case "hh":
						add = strict ? "(0[1-9]{1}|1[0-2]{1})" : "(0?[1-9]{1}|1[0-2]{1})";
						break;
					case "H":
						add = strict ? "(\\d{1}|1\\d{1}|2[0-3]{1})" : "([0-1]?\\d{1}|2[0-3]{1})";
						break;
					case "HH":
						add = strict ? "(0\\d{1}|1\\d{1}|2[0-3]{1})" : "([0-1]?\\d{1}|2[0-3]{1})";
						break;
					case "m":
						add = strict ? "(\\d{1}|[1-5]{1}\\d{1})" : "([0-5]?\\d{1})";
						break;
					case "mm":
						add = strict ? "([0-5]{1}\\d{1})" : "([0-5]?\\d{1})";
						break;
					case "s":
						add = strict ? "(\\d{1}|[1-5]{1}\\d{1})" : "([0-5]?\\d{1})";
						break;
					case "ss":
						add = strict ? "([0-5]{1}\\d{1})" : "([0-5]?\\d{1})";
						break;
					case "zz":
					case "z":
						add = "([+-]?\\d\\d?)";
						break;
					case "zzz":
						add = "([+-]?\\d\\d?:\\d{2})";
						break;
					case "W":
						add = "([1-9]{1}|[2-4]{1}\\d{1}|5[0-3]{1})";
						break;
					case "/":
						add = "(\\" + cal["/"] + ")";
						break;
					default:
						$.error("Invalid date format pattern '" + m + "'.");
						break;
				}
				if (add) {
					regexp.push(add);
				}
				groups.push(match[0]);
			}
			appendPreOrPostMatch(expFormat.slice(index), regexp);
			regexp.push("$");

			var regexpStr = regexp.join("")
					.replace(whiteSpaceExp, "\\s+"), // allow whitespace to differ when matching formats.
				parseRegExp = {
					"regExp": regexpStr,
					"groups": groups,
					strict: strict
				},
				ret = re[format] = parseRegExp; // cache the regex for this format.
			return ret;
		}

		function parseExact(value, format, region) {
			// try to parse the date string by matching against the format string
			// while using the specified region for date field names.
			value = $.trim(value);
			var cal = region.calendar,
				// convert date formats into regular expressions with groupings.
				// use the regexp to determine the input format and extract the date fields.
				parseInfo = getParseRegExp(cal, format),
				match = new RegExp(parseInfo.regExp)
					.exec(value);
			if (match === null) {
				return null;
			}
			// found a date format that matches the input.
			var groups = parseInfo.groups,
				era = null,
				year = null,
				month = null,
				date = null,
				weekDay = null,
				hour = 0,
				hourOffset, min = 0,
				sec = 0,
				msec = 0,
				tzMinOffset = null,
				pmHour = false;
			// iterate the format groups to extract and set the date fields.
			for (var j = 0, jl = groups.length; j < jl; j++) {
				var matchGroup = match[j + 1];
				if (matchGroup) {
					var current = groups[j],
						clength = current.length,
						matchInt = parseInt(matchGroup, 10);
					switch (current) {
						case "dd":
						case "d":
							// Day of month.
							date = matchInt;
							// check that date is generally in valid range, also checking overflow below.
							if (outOfRange(date, 1, 31)) {
								return null;
							}
							break;
						case "MMM":
						case "MMMM":
							month = getMonthIndex(cal, matchGroup, clength === 3);
							if (outOfRange(month, 0, 11)) {
								return null;
							}
							break;
						case "M":
						case "MM":
							// Month.
							month = matchInt - 1;
							if (outOfRange(month, 0, 11)) {
								return null;
							}
							break;
						case "y":
						case "yy":
						case "yyyy":
							year = clength < 4 ? expandYear(cal, matchInt) : matchInt;
							if (outOfRange(year, 0, 9999)) {
								return null;
							}
							break;
						case "h":
						case "hh":
							// Hours (12-hour clock).
							hour = matchInt;
							if (hour === 12) {
								hour = 0;
							}
							if (outOfRange(hour, 0, 11)) {
								return null;
							}
							break;
						case "H":
						case "HH":
							// Hours (24-hour clock).
							hour = matchInt;
							if (outOfRange(hour, 0, 23)) {
								return null;
							}
							break;
						case "m":
						case "mm":
							// Minutes.
							min = matchInt;
							if (outOfRange(min, 0, 59)) {
								return null;
							}
							break;
						case "s":
						case "ss":
							// Seconds.
							sec = matchInt;
							if (outOfRange(sec, 0, 59)) {
								return null;
							}
							break;
						case "tt":
						case "t":
							// AM/PM designator.
							// see if it is standard, upper, or lower case PM. If not, ensure it is at least one of
							// the AM tokens. If not, fail the parse for this format.
							pmHour = cal.PM && (matchGroup === cal.PM[0] || matchGroup === cal.PM[1] || matchGroup === cal.PM[2]);
							if (!pmHour && (!cal.AM || (matchGroup !== cal.AM[0] && matchGroup !== cal.AM[1] && matchGroup !== cal.AM[2]))) {
								return null;
							}
							break;
						case "f":
							// Deciseconds.
						case "ff":
							// Centiseconds.
						case "fff":
							// Milliseconds.
							msec = matchInt * Math.pow(10, 3 - clength);
							if (outOfRange(msec, 0, 999)) {
								return null;
							}
							break;
						case "ddd":
							// Day of week.
						case "dddd":
							// Day of week.
							weekDay = getDayIndex(cal, matchGroup, clength === 3);
							if (outOfRange(weekDay, 0, 6)) {
								return null;
							}
							break;
						case "zzz":
							// Time zone offset in +/- hours:min.
							var offsets = matchGroup.split(/:/);
							if (offsets.length !== 2) {
								return null;
							}
							hourOffset = parseInt(offsets[0], 10);
							if (outOfRange(hourOffset, - 12, 13)) {
								return null;
							}
							var minOffset = parseInt(offsets[1], 10);
							if (outOfRange(minOffset, 0, 59)) {
								return null;
							}
							tzMinOffset = (hourOffset * 60) + (startsWith(matchGroup, "-") ? -minOffset : minOffset);
							break;
						case "z":
						case "zz":
							// Time zone offset in +/- hours.
							hourOffset = matchInt;
							if (outOfRange(hourOffset, - 12, 13)) {
								return null;
							}
							tzMinOffset = hourOffset * 60;
							break;
						case "g":
						case "gg":
							var eraName = matchGroup;
							if (!eraName || !cal.eras) {
								return null;
							}
							eraName = $.trim(eraName.toLowerCase());
							for (var i = 0, l = cal.eras.length; i < l; i++) {
								if (eraName === cal.eras[i].name.toLowerCase()) {
									era = i;
									break;
								}
							}
							// could not find an era with that name
							if (era === null) {
								return null;
							}
							break;
					}
				}
			}
			var result = new Date(),
				defaultYear, convert = cal.convert;
			defaultYear = convert ? convert.fromGregorian(result)[0] : result.getFullYear();
			if (year === null) {
				year = defaultYear;
			}
			else if (cal.eras) {
				// year must be shifted to normal gregorian year
				// but not if year was not specified, its already normal gregorian
				// per the main if clause above.
				year += cal.eras[(era || 0)].offset;
			}
			// set default day and month to 1 and January, so if unspecified, these are the defaults
			// instead of the current day/month.
			if (month === null) {
				month = 0;
			}
			if (date === null) {
				date = 1;
			}
			// now have year, month, and date, but in the region's calendar.
			// convert to gregorian if necessary
			if (convert) {
				result = convert.toGregorian(year, month, date);
				// conversion failed, must be an invalid match
				if (result === null) {
					return null;
				}
			}
			else {
				// have to set year, month and date together to avoid overflow based on current date.
				result.setFullYear(year, month, date);
				// check to see if date overflowed for specified month (only checked 1-31 above).
				if (result.getDate() !== date) {
					return null;
				}
				// invalid day of week.
				if (weekDay !== null && result.getDay() !== weekDay) {
					return null;
				}
			}
			// if pm designator token was found make sure the hours fit the 24-hour clock.
			if (pmHour && hour < 12) {
				hour += 12;
			}
			result.setHours(hour, min, sec, msec);
			if (tzMinOffset !== null) {
				// adjust timezone to utc before applying local offset.
				var adjustedMin = result.getMinutes() - (tzMinOffset + result.getTimezoneOffset());
				// Safari limits hours and minutes to the range of -127 to 127.  We need to use setHours
				// to ensure both these fields will not exceed this range.  adjustedMin will range
				// somewhere between -1440 and 1500, so we only need to split this into hours.
				result.setHours(result.getHours() + parseInt(adjustedMin / 60, 10), adjustedMin % 60);
			}
			return result;
		}

		function formatDate(value, format, region) {
			var cal = region.calendar,
				convert = cal.convert,
				ret;
			if (!format || !format.length || format === "i") {
				if (region && region.name.length) {
					if (convert) {
						// non-gregorian calendar, so we cannot use built-in toLocaleString()
						ret = formatDate(value, cal.patterns.F, region);
					}
					else {
						var eraDate = new Date(value.getTime()),
							era = getEra(value, cal.eras);
						eraDate.setFullYear(getEraYear(value, cal, era));
						ret = eraDate.toLocaleString();
					}
				}
				else {
					ret = value.toString();
				}
				return ret;
			}

			var eras = cal.eras,
				sortable = format === "s";
			format = expandFormat(cal, format);

			// Start with an empty string
			ret = [];
			var hour,
				zeros = ["0", "00", "000"],
				foundDay,
				checkedDay,
				quoteCount = 0,
				converted;

			function padZeros(num, c) {
				var r, s = num + "";
				if (c > 1 && s.length < c) {
					r = (zeros[c - 2] + s);
					return r.substr(r.length - c, c);
				}
				else {
					r = s;
				}
				return r;
			}

			function hasDay() {
				if (foundDay || checkedDay) {
					return foundDay;
				}
				foundDay = dayPartRegExp.test(format);
				checkedDay = true;
				return foundDay;
			}

			function getPart(date, part) {
				if (converted) {
					return converted[part];
				}
				switch (part) {
					case 0:
						return date.getFullYear();
					case 1:
						return date.getMonth();
					case 2:
						return date.getDate();
				}
			}

			if (!sortable && convert) {
				converted = convert.fromGregorian(value);
			}

			for (;;) {
				// Save the current index
				var index = tokenDateExp.lastIndex,
					// Look for the next pattern
					ar = tokenDateExp.exec(format);

				// Append the text before the pattern (or the end of the string if not found)
				var preMatch = format.slice(index, ar ? ar.index : format.length);
				quoteCount += appendPreOrPostMatch(preMatch, ret);

				if (!ar) {
					break;
				}

				// do not replace any matches that occur inside a string literal.
				if (quoteCount % 2) {
					ret.push(ar[0]);
					continue;
				}

				var current = ar[0],
					clength = current.length,
					names;

				switch (current) {
					case "ddd":
						//Day of the week, as a three-letter abbreviation
					case "dddd":
						// Day of the week, using the full name
						names = (clength === 3) ? cal.days.namesAbbr : cal.days.names;
						ret.push(names[value.getDay()]);
						break;
					case "d":
						// Day of month, without leading zero for single-digit days
					case "dd":
						// Day of month, with leading zero for single-digit days
						foundDay = true;
						ret.push(padZeros(getPart(value, 2), clength));
						break;
					case "MMM":
						// Month, as a three-letter abbreviation
					case "MMMM":
						// Month, using the full name
						var part = getPart(value, 1);
						ret.push(
						(cal.monthsGenitive && hasDay()) ? cal.monthsGenitive[clength === 3 ? "namesAbbr" : "names"][part] : cal.months[clength === 3 ? "namesAbbr" : "names"][part]);
						break;
					case "M":
						// Month, as digits, with no leading zero for single-digit months
					case "MM":
						// Month, as digits, with leading zero for single-digit months
						ret.push(padZeros(getPart(value, 1) + 1, clength));
						break;
					case "y":
						// Year, as two digits, but with no leading zero for years less than 10
					case "yy":
						// Year, as two digits, with leading zero for years less than 10
					case "yyyy":
						// Year represented by four full digits
						part = converted ? converted[0] : getEraYear(value, cal, getEra(value, eras), sortable);
						if (clength < 4) {
							part = part % 100;
						}
						ret.push(padZeros(part, clength));
						break;
					case "h":
						// Hours with no leading zero for single-digit hours, using 12-hour clock
					case "hh":
						// Hours with leading zero for single-digit hours, using 12-hour clock
						hour = value.getHours() % 12;
						if (hour === 0) {
							hour = 12;
						}
						ret.push(padZeros(hour, clength));
						break;
					case "H":
						// Hours with no leading zero for single-digit hours, using 24-hour clock
					case "HH":
						// Hours with leading zero for single-digit hours, using 24-hour clock
						ret.push(padZeros(value.getHours(), clength));
						break;
					case "m":
						// Minutes with no leading zero  for single-digit minutes
					case "mm":
						// Minutes with leading zero  for single-digit minutes
						ret.push(padZeros(value.getMinutes(), clength));
						break;
					case "s":
						// Seconds with no leading zero for single-digit seconds
					case "ss":
						// Seconds with leading zero for single-digit seconds
						ret.push(padZeros(value.getSeconds(), clength));
						break;
					case "t":
						// One character am/pm indicator ("a" or "p")
					case "tt":
						// Multicharacter am/pm indicator
						part = value.getHours() < 12 ? (cal.AM ? cal.AM[0] : " ") : (cal.PM ? cal.PM[0] : " ");
						ret.push(clength === 1 ? part.charAt(0) : part);
						break;
					case "f":
						// Deciseconds
					case "ff":
						// Centiseconds
					case "fff":
						// Milliseconds
						ret.push(padZeros(value.getMilliseconds(), 3)
							.substr(0, clength));
						break;
					case "z":
						// Time zone offset, no leading zero
					case "zz":
						// Time zone offset with leading zero
						hour = value.getTimezoneOffset() / 60;
						ret.push((hour <= 0 ? "+" : "-") + padZeros(Math.floor(Math.abs(hour)), clength));
						break;
					case "zzz":
						// Time zone offset with leading zero
						hour = value.getTimezoneOffset() / 60;
						ret.push((hour <= 0 ? "+" : "-") + padZeros(Math.floor(Math.abs(hour)), 2) +
						// Hard coded ":" separator, rather than using cal.TimeSeparator
						// Repeated here for consistency, plus ":" was already assumed in date parsing.
						":" + padZeros(Math.abs(value.getTimezoneOffset() % 60), 2));
						break;
					case "g":
					case "gg":
						if (cal.eras) {
							ret.push(cal.eras[getEra(value, eras)].name);
						}
						break;
					case "/":
						ret.push(cal["/"]);
						break;
					case "W":
						var Y = value.getYear(),
							M = value.getMonth(),
							d = value.getDate(),
							dateObj = new Date(Y, M, d),
							Wd = dateObj.getDay() || 7,
							Wmin = cal.firstWeekMin;

						if (M === 11 && d >= (35 - Wmin) && Wd < d - (35 - Wmin)) {
							return 1;
						}
						else if (M === 0 && d <= Wmin && Wd <= d + (Wmin - 1)) {
							return 1;
						}
						else if (M === 0 && d <= Wmin) {
							Y -= 1;
						}

						ret.push(Math.floor((dateObj - new Date(Y, 0, (Wmin + 1) - (new Date(Y, 0, Wmin)
							.getDay() || 7))) / 604800000) + 1);
						break;
					default:
						$.error("Invalid date format pattern '" + current + "'.");
						break;
				}
			}
			return ret.join("");
		}

		// start loading of extended dependencies
		moduleDepends(dependencies);
	});

	// define the jquery/i18n module
	moduleDefine();

}());