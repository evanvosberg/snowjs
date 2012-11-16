/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			class
 */

define("class", ["jquery", "util/scope"], function ($, scope, undefined) {

	// Base class, all classes based on this
	function _clss() {

	}

	// Base class prototype methods
	_clss.prototype = {
		constructor: function () {

		},
		_proxy: function (fn) {
			return typeof fn === "string" ? $.proxy(this, fn) : $.proxy(fn, this);
		}
	};

	/* DEPRECATED: Backward compatible API */
	_clss.prototype.Proxy = _clss.prototype._proxy;

	// while initializing a new class
	var initializing = false,

		// inherit from super-class, sets up the Inherited method, and extend the options hash
		inheritProps = function (prototype, basePrototype, classPrototype) {
			$.each(prototype, function (prop, value) {
				if ($.isFunction(value) && $.isFunction(basePrototype[prop])) {
					classPrototype[prop] = (function () {
						var _super = function () {
								return basePrototype[prop].apply(this, arguments);
							},
							_superApply = function (args) {
								return basePrototype[prop].apply(this, args);
							};
						return function () {
							var __super = this._super,
								__superApply = this._superApply,
								returnValue;

							this._super = _super;
							this._superApply = _superApply;
							/* DEPRECATED: Backward compatible API */
							this.Inherited = _superApply;

							returnValue = value.apply(this, arguments);

							this._super = __super;
							this._superApply = __superApply;
							/* DEPRECATED: Backward compatible API */
							this.Inherited = __superApply;

							return returnValue;
						};
					}());
				}
				else {
					classPrototype[prop] = prototype[prop];
				}
			});

			return classPrototype;
		},

		classCreator = function (classname, base, prototype, multiple) {

			/* DEPRECATED: Backward compatible API */
			if (prototype.Constructor) {
				var constructor = prototype.Constructor;
				prototype.constructor = function () {
					this._superApply(arguments);
					return constructor.apply(this, arguments);
				};
				prototype.Constructor = undefined;
			}

			var parts = classname.split(/\./),
				fullName = classname,
				shortName = parts.pop(),
				namespace = parts.join("."),

				// All construction is actually done in the init method
				clss = scope(namespace, multiple ? context : undefined)[shortName] = function () {
					if (initializing) {
						return;
					}
					else {
						return this.constructor.apply(this, arguments);
					}
				};

			// Init instance of base as prototype (without constructor)
			initializing = true;
			clss.prototype = new base();
			initializing = false;

			// Copy the properties over onto the new prototype
			clss.prototype = inheritProps(prototype, base.prototype, clss.prototype);

			// Set things that can't be overwritten
			clss.prototype[".class"] = $.extend(clss, {
				constructor: clss,
				prototype: clss.prototype,
				fullName: fullName,
				shortName: shortName,
				_super: base.prototype
			});

			return clss;
		},

		// Context to cache classes for multiple extends
		context = {},

		// Count cached classes
		uid = 0,

		// Create a new class
		module = function (classname, bases, prototype) {
			if (!prototype) {
				return classCreator(classname, _clss, bases);
			}
			else if ($.isArray(bases)) {
				var base = bases.shift(),
					basePrototype,
					baseClassname;

				for (var i = 0, l = bases.length; i < l; i++) {
					baseClassname = "_" + (uid++);
					basePrototype = bases.shift()
						.prototype;

					base = classCreator(baseClassname, base, basePrototype, true);
					base.fullName = basePrototype[".class"].fullName;
					base.shortName = basePrototype[".class"].shortName;
				}

				return classCreator(classname, base, prototype);
			}
			else {
				return classCreator(classname, bases, prototype);
			}
		};

	// check is object a class, strict sure it was build with Class.define
	module.isClass = function (obj, strict) {
		return $.isFunction(obj) && !$.isEmptyObject(obj.prototype) && (strict ? !! obj.prototype[".class"] : true);
	};

	return module;

});