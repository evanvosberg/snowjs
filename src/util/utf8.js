/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/utf8
 */

define("util/utf8", [], function () {

	return {
		// encode string to utf-8 charset
		encode: function (input) {
			input = input.replace(/\r\n/g, "\n");
			var output = "";

			for (var n = 0; n < input.length; n++) {
				var c = input.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				}
				else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}

			return output;
		},
		// decode string from utf-8 charset
		decode: function (input) {
			var output = "",
				i = 0,
				c1 = 0,
				c2 = 0,
				c3 =0;

			while (i < input.length) {
				c1 = input.charCodeAt(i);
				if (c1 < 128) {
					output += String.fromCharCode(c1);
					i++;
				}
				else if ((c1 > 191) && (c1 < 224)) {
					c2 = input.charCodeAt(i + 1);
					output += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = input.charCodeAt(i + 1);
					c3 = input.charCodeAt(i + 2);
					output += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}

			return output;
		}
	};

});