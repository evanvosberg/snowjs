/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/xml
 */

define("jquery/xml", ["jquery"], function ($, undefined) {

	// original jQuery.fn.html
	var _fnHtml = $.fn.html,

		// original jQuery.clean
		_clean = $.clean,

		// map of node types
		createMap = {
			1: "createElement",
			3: "createTextNode",
			4: "createCDATASection",
			8: "createComment"
		},

		// match self closing tag
		singleExp = /^(<[^>]+?>)$/,

		// match inner XML
		innerExp = /^(<[^>]+?>)(.*?)(<\/[^>]+?>)$/,

		// short scope
		isXML = $.isXMLDoc,

		// clean for XML
		cleanXML = function (xmlString, context, fragment) {
			var xmlDoc = $.parseXML("<root>" + xmlString + "</root>"),
				appendNodes = function (target, copy, level) {
					var type = copy.nodeType,
						create = createMap[type],
						clone;

					if (level > 1 && create) {
						clone = target.appendChild(context[create](type === 1 ? copy.nodeName : copy.text || copy.nodeValue || ""));

						if (type === 1) {
							$.each(copy.attributes || [], function (i, attr) {
								var name = attr.name;
								// add attribute, using the jQuery.props map
								clone.setAttribute($.propFix[name] || name, attr.value);
							});

							target = clone;
						}
					}

					$.each(copy.childNodes || [], function (i, child) {
						appendNodes(target, child, level + 1);
					});
				};

			// clone XML document to fragment
			if (xmlDoc) {
				appendNodes(fragment, xmlDoc.documentElement, 1);
			}

			return fragment;
		};

	// new jQuery.clean
	$.clean = function (elems, context, fragment, scripts) {
		return isXML(context) && elems.length === 1 && typeof elems[0] === "string" ?
		// clean XML
		cleanXML(elems[0], context, fragment) :
		// clean HTML
		_clean.call($, elems, context, fragment, scripts);
	};

	$.fn.extend({
		// redirect for get innerXML, need for .domManip() if value is a function
		html: function (value) {
			return isXML(this[0]) && value === undefined ? this.xml() : _fnHtml.call(this, value);
		},
		// set + get innerXML
		xml: function (value) {
			var firstNode = this[0] || {},
				isFunction = $.isFunction(value);

			return isXML(firstNode) ?
			// if is XML
			value === undefined ?
			// get innerXML
			(window.XMLSerializer !== undefined ? new window.XMLSerializer()
				.serializeToString(firstNode) : firstNode.xml)
				.replace(singleExp, "")
				.replace(innerExp, "$2") :
			// set innerXML
			this.each(function (i) {
				var elem = $(this),
					newValue = isFunction ? value(i, elem.xml()) : value;
				elem.empty()
					.append(newValue);
			}) :
			// else ERROR
			$.error("TypeError: Result of expression 'this.xml' [undefined] is only supported for XML documents.");
		}
	});

});