/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @based			jQuery XML to JSON Plugin (http://www.fyneworks.com/jquery/xml-to-json) license (http://en.wikipedia.org/wiki/MIT_License and http://www.gnu.org/licenses/gpl-2.0.html)
 *
 * @module			jquery/fn/json
 */

define("jquery/fn/json", ["util/json", "jquery", "jquery/xml"], function (json, $) {

	$.fn.extend({
		toJSON: function (options) {
			var firstNode = this[0],
				ret = null,
				o = $.extend({
					extended: false,
					camelCase: false,
					multiple: "",
					cdata: "",
					getObject: false
				}, options);

			if (firstNode) {
				ret = node2data(firstNode, o);
			}

			if (!o.getObject) {
				ret = json.encode(ret);
			}

			return ret;
		}
	});

	var node2data = function (domNode, o) {

			var readCDATA = $.isXMLDoc(domNode) ? "xml" : "html",

				parseDOM = function (node, simple) {
					if (!node) {
						return null;
					}

					var out,
						txt = [],
						obj = null,
						attrs = null,
						elem = $(node);

					if (o.cdata && elem.is(o.cdata)) {
						// Handle content as CDATA
						txt.push(elem[readCDATA]());
					}
					else if (node.childNodes && node.childNodes.length > 0) {
						// Walk childNodes
						$.each(node.childNodes, function (i, childNode) {
							var childElem = $(childNode),
								childType = childNode.nodeType,
								childName = o.camelCase ? $.camelCase(childNode.localName || childNode.nodeName) : childNode.localName || childNode.nodeName,
								childValue = childNode.text || childNode.nodeValue || "";

							if (childType === 8) {
								// Ignore comment node
								return;
							}
							else if (childType === 3 || childType === 4 || !childName) {
								// Ignore white-space in between tags
								if ((/^\s+$/)
									.test(childValue)) {
									return;
								}

								// Make sure we ditch trailing spaces from markup
								txt.push($.trim(childValue));
							}
							else {
								obj = obj || {};
								if (obj[childName]) {
									obj[childName] = myArr(obj[childName]);
									obj[childName].push(parseDOM(childNode, true /* simple */ ));
								}
								else if (o.multiple && childElem.is(o.multiple)) {
									obj[childName] = myArr(parseDOM(childNode));
								}
								else {
									obj[childName] = parseDOM(childNode);
								}
							}
						});
					}

					if (node.attributes) {
						if (node.attributes.length > 0) {
							attrs = {};
							obj = obj || {};

							$.each(node.attributes, function (i, attr) {
								var attrName = o.camelCase ? $.camelCase(attr.name) : attr.name,
									attrValue = attr.value;

								attrs[attrName] = attrValue;

								if (obj[attrName]) {

									if (!obj[attrName].length) {
										obj[attrName] = myArr(obj[attrName]);
									}

									obj[attrName].push(attrValue);
								}
								else {
									obj[attrName] = attrValue;
								}
							});
						}
					}

					// Merge txt
					txt = obj && obj.text ? $.merge($.isArray(obj.text) ? obj.text : [obj.text], txt) : txt;

					if (obj) {
						obj.text = txt.length <= 1 ? txt.join("") : txt;
						// Remove if emty text
						if (!obj.text) {
							delete obj.text;
						}
						txt = "";
					}
					else {
						txt = txt.join(" ");
					}

					out = obj || txt;

					if (o.extended) {
						if (txt) {
							// New String(out);
							out = {};
						}

						if ((txt = out.text || txt) && !$.isArray(out.text = txt)) {
							out.text = [out.text];
						}

						if (!simple) {
							out = myArr(out);
						}

					}

					return out;
				};

			if (!domNode) {
				// Quick fail
				return {};
			}

			// Quick fail if not xml/html (or if this is a node)
			if (!domNode.nodeType) {
				return;
			}

			// Quick return if text or cdata node
			if (domNode.nodeType === 3 || domNode.nodeType === 4) {
				return domNode.nodeValue;
			}

			// Send output
			return parseDOM(domNode, true /* simple */ );
		},

		myArr = function (obj) {
			if (!$.isArray(obj)) {
				obj = [obj];
			}

			// Here is where you can attach additional functionality, such as searching and sorting...
			return obj;
		};

	return $;
});