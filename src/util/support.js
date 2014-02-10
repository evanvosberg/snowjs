/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/support
 */

define("util/support", [], function () {

	// Helper to detect feature support
	var doc = document,
		head = doc.getElementsByTagName("head")[0],
		div = doc.createElement("div"),
		form = doc.createElement("form"),
		button = doc.createElement("button"),
		inputText = doc.createElement("input"),
		inputFile = doc.createElement("input"),

		flash,
		flashDesc,
		flashVers = "",
		flashName = "Shockwave Flash",
		/*global navigator*/
		plugins = navigator.plugins,
		l = plugins.length,
		i,

		module;

	// Adjust helper elements
	inputFile.setAttribute("type", "file");
	form.setAttribute("id", "support-form-attr");
	try { button.setAttribute("form", "support-form-attr"); } catch (error) {}
	div.appendChild(form);
	div.appendChild(button);
	head.appendChild(div);

	// Detect flash version
	if (l) {
		flash = plugins[flashName];
		if (flash) {
			flashVers = flash.version;
			flashDesc = flash.description;
		}
		else {
			for (i = 0; i < l; i++) {
				flash = plugins[i].name === flashName;
				if (flash) {
					flashVers = flash.version;
					flashDesc = flash.description;
					break;
				}
			}
		}

		if (!flashVers && flashDesc) {
			var found = flashDesc.match(/([0-9\.]+)/g);
			flashVers = found ? found[0] : flashVers;
		}
	}
	else {
		for (i = 15; i > 3; i--) {
			try {
				/*jshint nonew:false*/
				/*global ActiveXObject*/
				new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
				flashVers = i + "";
				break;
			}
			catch (error) {}
		}
	}

	// Define module object
	module = {
		// Flash plugin (version)
		flash: flashVers || "",

		// Touch events
		touchEvent: window.ontouchstart !== undefined,

		// AJAX file upload
		ajaxUpload: typeof XMLHttpRequestUpload !== "undefined",

		// Multiple file select by single file input
		inputFileMultipleAttr: !! inputFile.files,

		// Placeholder attribute for input elements
		inputPlaceholderAttr: "placeholder" in inputText,

		// Form attribute for input elements
		inputFormAttr: button.form === form
	};

	// Clear helper
	head.removeChild(div);

	// Expose module
	return module;
});