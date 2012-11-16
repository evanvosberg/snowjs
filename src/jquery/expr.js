/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/expr
 */

define("jquery/expr", ["jquery"], function ($) {

	var inputTextareaExp = /^(input|textarea)$/i,
		selectExp = /^select$/i,
		checkedExp = /^(radio|checkbox)$/i,
		onExp = /^(|on)$/i;

	// special selector
	$.extend($.expr[":"], {
		"changed": function (elem) {
			return inputTextareaExp.test(elem.nodeName) ? checkedExp.test(elem.type) ? elem.defaultChecked !== elem.checked || (elem.defaultValue !== elem.value && !onExp.test(elem.defaultValue) && !onExp.test(elem.value)) : elem.defaultValue !== elem.value : selectExp.test(elem.nodeName) ? !(elem.options[elem.selectedIndex] || {})
				.defaultSelected : false;
		},
		"readonly": function (elem) {
			return !!elem[$.propFix.readonly];
		}
	});

});