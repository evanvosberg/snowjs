/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/array
 */

define("util/array", ["jquery"], function ($) {

	var arrayProto = Array.prototype,

		splice = arrayProto.splice,

		push = arrayProto.push,

		add,

		module = {
			// reverse method to splice, works with arrays and array-like objects
			unsplice: function (target, insert, i) {
				push.apply(add = [isNaN(i) ? target.length : i, 0], !$.isArray(insert) ? $.merge([], insert) : insert);
				splice.apply(target, add);

				return target;
			}
		};

	return module;

});