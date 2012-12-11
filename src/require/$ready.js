/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			$ready
 */

define("$ready", ["jquery"], function ($) {

	// loader plugin/module
	var module = {

			// plugin/module load method
			load: function (name, req, load, config) {
				// prevent timeout error
				config.waitSeconds = 0;

				// add to load stack
				domReady.done(load);
			}
		},

		// dom ready deferred
		domReady = $.Deferred();

	// resolve deferred on dom ready
	$(function () {
		domReady.resolve(true);
	});

	// expose loader plugin/module
	return module;

});