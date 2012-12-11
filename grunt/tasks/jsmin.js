module.exports = function (grunt) {

	"use strict";

	var uglify = require("uglify-js"),
		file = grunt.file;

	grunt.registerMultiTask("jsmin", "Minify javascript files in distribution.", function () {
		var renameMap = this.data.rename || {},
			rename = function (abspath) {
				return renameMap[abspath] || abspath;
			};

		if (typeof rename === "function") {
			rename = this.data.rename;
		}

		file.expandFiles(this.file.src)
			.forEach(function (abspath) {
				file.write(rename(abspath), uglify(file.read(abspath)));
			});
	});

};