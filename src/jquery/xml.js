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

	// Original jQuery.fn.html
	var _fnHtml = $.fn.html,

		// Original jQuery.buildFragment
		_buildFragment = $.buildFragment,

		// map of node types
		createMap = {
			1: "createElement",
			3: "createTextNode",
			4: "createCDATASection",
			8: "createComment"
		},

		// Match self closing tag
		singleExp = /^(<[^>]+?>)$/,

		// Match inner XML
		innerExp = /^(<[^>]+?>)(.*?)(<\/[^>]+?>)$/,

		// Short scope
		isXML = $.isXMLDoc,

		// Copy of save fragment method from jQuery core
		createSafeFragment = function (document) {
			var list = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"),
				safeFrag = document.createDocumentFragment();

			if (safeFrag.createElement) {
				while (list.length) {
					safeFrag.createElement(
					list.pop());
				}
			}
			return safeFrag;
		},

		// Fragment builder for XML
		buildFragmentXML = function (elems, context/*, scripts, selection*/) {
			var safe = createSafeFragment(context),
				
				l = elems.length,
				
				i = 0,

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
				},

				xmlDoc,
				
				elem;

			for (; i < l; i++) {
				elem = elems[i];

				xmlDoc = $.parseXML("<root>" + elem + "</root>");

				// clone XML document to fragment
				if (xmlDoc) {
					appendNodes(safe, xmlDoc.documentElement, 1);
				}

			}

			return safe;
		};

	$.buildFragment = function () {
		return (isXML(arguments[1]) ? buildFragmentXML : _buildFragment)
			.apply(this, arguments);
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

	return $;
});