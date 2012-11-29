/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/fn/form
 */

define("jquery/fn/form", ["jquery", "jquery/expr"], function ($) {

	var _form = document.createElement("form");

	$.fn.extend({
		// Find all associated inputs to the first matched (default selector ":radio")
		formGroup: function (selector) {
			var elem = this.filter((selector = selector || ":radio") + ":first")[0] || {},
				name = elem.name,
				form = elem.form,
				owner = elem.ownerDocument,
				elems = [];

			if (name && (form || owner)) {
				$.each(selector = selector.split(","), function (i, sel) {
					selector[i] = $.trim(sel) + "[name='" + name + "']";
				});
				selector = selector.join(",");

				elems = (
				form ? $(form)
					.formInput()
					.filter(selector) : $(":input", owner)
					.filter(selector)
					.filter(function () {
						return !this.form;
					}))
					.get();
			}

			return this.pushStack(elems);
		},

		// Find all inputs of the the first matched form
		formInput: function () {
			return this.pushStack((this.filter("form:first")[0] || {})
				.elements || []);
		},

		// Reset all selected forms or formInputs
		formReset: function () {
			var stack = [],
				form = this.filter("form:first");

			this.filter(":input")
				.each(function () {
					var elem = $(this),
						spacer = elem.clone()
							.insertAfter(elem);

					_form.appendChild(this);
					stack.push([elem, spacer]);
				});

			// First match form
			if (form.length) {
				form[0].reset();
				form.triggerHandler("reset");
			}

			// Matched elements
			_form.reset();

			$.each(stack, function (i, data) {
				var elem = data[0],
					spacer = data[1];

				elem.insertBefore(spacer)
					.triggerHandler("reset");
				spacer.remove();
			});

			return this;
		},

		// Clear all selected forms or formInputs
		formClear: function () {
			var inputs = $(this);

			inputs.push.apply(inputs, inputs.formInput()
				.get());

			inputs.filter(":file")
				.formReset();
			inputs.filter(":checked")
				.removeProp("checked");
			inputs.not("select,:radio,:checkbox")
				.val("");
			inputs.find("select")
				.prop("selectedIndex", - 1);
			inputs.find("option:selected")
				.removeProp("selected");

			return this;
		}
	});

	return $;
});