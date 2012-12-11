/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			$pub
 */

define("$pub", [], function () {

	// Loader plugin/module
	var module = {

			// Pending handler
			pending: function (name, load) {
				var nameParts = name.split("!"),
					normName = nameParts[1] || nameParts[0],
					prevLoad = this.pending[normName];

				// Set status
				if (typeof load !== "undefined") {
					this.pending[normName] = load;
				}

				// return status
				return prevLoad;
			},

			normalize: function (name, normalize) {
				if (normalize && !_normalize) {
					_normalize = normalize;
				}

				return name;
			},

			// Plugin/module load method
			load: function (name, req, load, config) {
				// Prevent timeout error
				config.waitSeconds = 0;

				// Add to pending stack
				this.pending(name, load);
			}
		},

		// Local contextual normalize for prefix
		_normalize,

		// Save original define to hook add a hook
		_define = define,

		// Get raw toString method
		toString = Object.prototype.toString;

	// Hook define method
	define = function (name, deps, callback) {
		var load;

		if (/!/.test(name) && _normalize && _normalize(name.split("!")[0], name, true) === "$pub" && (load = module.pending(name, false))) {
			// Module may not have dependencies
			if (toString.call(deps) !== "[object Array]") {
				callback = deps;
				deps = [];
			}

			// Call load after dependencies are loaded
			require(deps, function () {
				load(typeof callback === "function" ? callback.apply(this, arguments) : callback);
			});
		}
		else {
			// Call original define
			_define.apply(_define, arguments);
		}
	};

	// Redefine properties of original define
	for (var prop in _define) {
		define[prop] = _define[prop];
	}

	// Expose loader plugin/module
	return module;

});