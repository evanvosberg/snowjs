/**
 *	@module				class			{Class}
 *
 *	@author				Evan Vosberg
 *	@copyright			© 2012 by Evan Vosberg
 *	@info				http://github.com/evanvosberg
 *
 *	@license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

define("class", ["jquery", "util/scope"], function ($, scope, undefined) {

	/**
	 *	@class				Class			Create a class object.
	 *	@category			Utilities
	 *
	 *	@signature
	 *		@since			1.0
	 *		@param			{String}		classname		A scope name in dot natation to define the class global.
	 *		@optional
	 *		@param			{Array, Class}	superclass		A class object or an array of class objects.
	 *		@optional
	 *		@param			{Object}		properties		An object of methods and properties for the speciefied class.
	 *			@option		{Function}		constructor		The class constructer which will be called on instantiate.
	 *			@since		1.0
	 *			@optional
	 *		@return			{Class}
	 *
	 *	@description		Javascript doesn't have a Class system like Java, ```Class()``` simulates this.
	 *
	 *						#### Setup a constuctor for the class
	 *						If a method of the properties named *constructor*, it will be interpreted as the constructor method on
	 *						calling a new instance of the class. Also all constuctors of superclasses will be exectuted on calling a
	 *						new instance of the class.
	 *
	 *						#### Call overwritten inherited methods
	 *						If a class overwrites a method of a superclass with an own method, you can call the original method inside
	 *						of the new method in the following way ```this._super(arg1, argN)``` or ```this._superApply(args)```.
	 */
	function _clss() {

	}

	// Base class prototype methods
	_clss.prototype = {
		constructor: function () {

		},

		/**
		 *	@method				_proxy				This method is most useful for attaching event handlers to an element where the context is the current class instance.
		 *
		 *	@signature
		 *		@since			1.0
		 *		@param			{String,Function}	function	The function or the name of a function (from current instance) whose context will be changed to the current instance.
		 *		@return			{Function}
		 *
		 *	@description		{md}	Additionally, ```._proxy()``` makes sure that even if you bind ```jQuery.on()``` the function with returned from ```._proxy()``` it will still unbind ```jQuery.off()``` the correct function, if passed the original.
		 */
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

		classCreator = function (classname, base, prototype, classscope) {

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
				clss = scope(namespace, classscope)[shortName] = function () {
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
			var classscope = window;

			// Without classname no global definition
			if (typeof classname !== "string") {
				prototype = bases;
				bases = classname;
				classname = "local" + (uid++) + ".Class";
				classscope = context;
			}
			
			if (!prototype) {
				return classCreator(classname, _clss, bases);
			}
			else if ($.isArray(bases)) {
				var base = bases.shift(),
					basePrototype,
					baseClassname;

				for (var i = 0, l = bases.length; i < l; i++) {
					baseClassname =  "multi" + (uid++) + ".Class";
					basePrototype = bases.shift()
						.prototype;

					base = classCreator(baseClassname, base, basePrototype, context);
					base.fullName = basePrototype[".class"].fullName;
					base.shortName = basePrototype[".class"].shortName;
				}

				return classCreator(classname, base, prototype, classscope);
			}
			else {
				return classCreator(classname, bases, prototype, classscope);
			}
		};

	/**
	 *	@function			Class.isClass	Determine whether the given argument is an class object.
	 *
	 *	@category			Utilities
	 *
	 *	@signature
	 *		@since			1.0
	 *		@param			{Function}		function	Object to test whether or not it is a function.
	 *		@param			{Boolean}		strict		A boolean indication whether the class was created with Class().
	 *		@optional
	 *		@return			{Boolean}
	 *
	 *	@description		{md}	This method determines whether the argument is an class object.
	 */

	// check is object a class, strict sure it was build with Class.define
	module.isClass = function (obj, strict) {
		return $.isFunction(obj) && !$.isEmptyObject(obj.prototype) && (strict ? !! obj.prototype[".class"] : true);
	};

	return module;

});