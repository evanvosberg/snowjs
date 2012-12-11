module.exports = function (grunt) {

	"use strict";

	var sqwish = require("sqwish"),
		file = grunt.file;

	grunt.registerMultiTask("cssmin", "Minify css files in distribution.", function () {
		var renameMap = this.data.rename || {},
			rename = function (abspath) {
				return renameMap[abspath] || abspath;
			};
		
		if (typeof this.data.rename === "function") {
			rename = this.data.rename;
		}
	
		file.expandFiles(this.file.src)
			.forEach(function (abspath) {
				file.write(rename(abspath), sqwish.minify(file.read(abspath)));
			});
	});
};