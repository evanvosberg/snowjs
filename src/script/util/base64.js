/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/base64
 */

var btoa, atob;

define("util/base64", ["util/utf8", "util/json"], function (utf8, json) {

	// private module variable
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		// module object
		module = {
			// encode string to base64
			encode: function (input, traditional) {
				return btoa(traditional ? input + "" : json.encode(input));
			},

			// decode string from base64
			decode: function (input, traditional) {
				var output = atob(input);

				return traditional ? output : json.decode(output);
			}
		};

	if (typeof btoa !== "function") {

		// implement gloabl ECMA method
		btoa = function (input) {
			input = utf8.encode(input + "");

			var output = "",
				chr1,
				chr2,
				chr3,
				enc1,
				enc2,
				enc3,
				enc4,
				i = 0;

			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				}
				else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
			}

			return output;
		};
	}

	if (typeof atob !== "function") {

		// implement gloabl ECMA method
		atob = function (input) {
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			var output = "",
				chr1,
				chr2,
				chr3,
				enc1,
				enc2,
				enc3,
				enc4,
				i = 0;

			while (i < input.length) {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 !== 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 !== 64) {
					output = output + String.fromCharCode(chr3);
				}
			}

			return utf8.decode(output);
		};
	}

	// expose module object
	return module;

});