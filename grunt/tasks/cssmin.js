module.exports = function (grunt) {

	"use strict";

	var fs = require("fs"),
		sqwish = require("sqwish");

	grunt.task.registerMultiTask("cssmin", "Minify css files in distribution.", function () {
		var renameMap = this.data.rename || {},
			rename = function (abspath) {
				return renameMap[abspath] || abspath;
			};

		if (typeof this.data.rename === "function") {
			rename = this.data.rename;
		}

		(grunt.file)
			.expand(this.data.src)
			.filter(function (abspath) {
				return !(fs)
					.lstatSync(abspath)
					.isDirectory();
			})
			.forEach(function (abspath) {
				grunt.file.write(rename(abspath), sqwish.minify(grunt.file.read(abspath)));
			});
	});
};