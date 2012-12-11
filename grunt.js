module.exports = function (grunt) {

	"use strict";

	var
		// Load modules
		fs = require("fs"),

		// Locals of grunt
		file = grunt.file,
		log = grunt.log,

		/*
		task = grunt.task,
		utils = grunt.utils,
		verbose = grunt.verbose,
		fail = grunt.fail,
		option = grunt.option,
		config = grunt.config,
		template = grunt.template,
		
		
		debug = function () {
			grunt.log.writeln(Array.prototype.join.call(arguments, "; "));
		},
		*/

		// Helper methods functionality
		helper = {
			// Get relative back path to givn path
			backpath: function (path) {
				var backPath = "",
					i = 0,
					l = path.split("/")
						.length - 1;

				for (; i < l; i++) {
					backPath += "../";
				}

				return backPath;
			},
			// Escape string for regular expression
			escapeRegExp: function (str) {
				return str.replace(/([\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "\\$1");
			},
			// Get handle to convert source to destination
			srcDestHandle: function (dest, stripExpr) {
				dest = dest.replace(/\/$/, "") + "/";
				stripExpr = stripExpr || (/^$/);

				var handle = function (str) {
						return dest + str.replace(stripExpr, "");
					};

				if (typeof stripExpr === "string") {
					stripExpr = new RegExp("^" + helper.escapeRegExp(stripExpr));
				}
				else if (typeof stripExpr === "function") {
					handle = stripExpr;
				}

				return handle;
			}
		},

		// Paths config
		paths = {
			// Distribution destination
			dest: "dist",
			// Development source
			src: "src",
			// git sub modules
			external: "external",
			// Test cases
			test: "tests"
		};


	//
	// Configure grunt
	//

	grunt.initConfig({
		pkg: "<json:package.json>",

		paths: paths,

		meta: {
			banner: "/*! AppDK v@<%= pkg.version %> http://github.com/evanvosberg/appdk */"
		},

		bridge: {
			"external": {
				dest: "<%= paths.external %>-bridge",
				strip: /^[^\/]+\//,
				src: "<%= paths.external %>-src/**/*"
			}
		},

		link: {
			"external": {
				dest: "<%= paths.src %>",
				strip: /^[^\/]+\//,
				src: "<%= paths.external %>-bridge/**/*"
			}
		},

		clean: {
			"dist": "<%= paths.dest %>/**/*",
			"external": "<%= paths.external %>-bridge/**/*"
		},

		copy: {
			"dist": {
				dest: "<%= paths.dest %>/lib",
				strip: /^[^\/]+\//,
				src: "<%= paths.src %>/**/*"
			}
		},

		jsmin: {
			"dist": {
				src: "<%= paths.dest %>/lib/**/*.js",
				rename: function (abspath) {
					return abspath.replace(/^[^\/]+\/lib\//, paths.dest + "/lib-min/");
				}
			}
		},

		cssmin: {
			"dist": {
				src: "<%= paths.dest %>/lib/**/*.js",
				rename: function (abspath) {
					return abspath.replace(/^[^\/]+\/lib\//, paths.dest + "/lib-min/");
				}
			}
		},

		qunit: {
			"source": "<%= paths.test %>/**/*.html"
		},

		lint: {
			"source": grunt.file.expandFiles(paths.src + "/**/*.js")
				.filter(function (abspath) {
					// Exclude external file and i18n definitions
					return !(/jquery\/i18n\//)
						.test(abspath) && !fs.lstatSync(abspath)
						.isSymbolicLink();
				}),
			"external": "<%= paths.external %>-src/**/*.js",
			"grunt": ["grunt.js", "grunt/**/*.js"]
		},

		jshint: {
			"source": {
				globals: {
					window: true,
					document: true,
					clearInterval: true,
					clearTimeout: true,
					setInterval: true,
					setTimeout: true,
					define: true,
					require: true
				}
			},
			"external": {
				globals: {
					define: true,
					require: true
				},
				options: {
					unused: false
				}
			},
			"grunt": {
				globals: {
					module: true,
					define: true,
					require: true
				}
			},
			options: {
				// Enforcing Options
				bitwise: false,
				camelcase: true,
				curly: true,
				eqeqeq: true,
				forin: false,
				immed: true,
				indent: true,
				latedef: true,
				newcap: false,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: false,
				quotmark: true,
				regexp: false,
				undef: true,
				unused: true,
				trailing: true,
				// Relaxing Options
				asi: false,
				boss: false,
				debug: false,
				eqnull: false,
				es5: false,
				esnext: false,
				maxparams: false,
				maxdepth: false,
				maxstatements: false,
				maxcomplexity: false,
				maxlen: false,
				evil: false,
				expr: false,
				funcscope: false,
				globalstrict: false,
				iterator: false,
				lastsemic: false,
				laxbreak: false,
				laxcomma: false,
				loopfunc: false,
				multistr: false,
				onecase: false,
				proto: false,
				regexdash: false,
				scripturl: false,
				smarttabs: false,
				shadow: false,
				sub: false,
				supernew: false,
				validthis: false,
				// Legacy
				nomen: false,
				onevar: false,
				passfail: false,
				white: false
			}
		}
	});

	grunt.loadTasks("grunt/tasks");

	grunt.registerMultiTask("bridge", "Copy / merge files from other sources as temporarily bridge.", function () {
		var copyExp = /^\/\*\s*copy\(["|'](.*?)["|']\)\s*\*\/$/,
			importExp = /\/\*\s*import\(["|'](.*?)["|']\)\s*\*\//g,

			// Copy helper
			srcDest = helper.srcDestHandle(this.file.dest, this.data.strip),
			files = file.expandFiles(this.file.src);

		// Walk files
		files.forEach(function (abspath) {
			var target = srcDest(abspath),
				content = file.read(abspath);

			// Copy files or directories
			if (copyExp.test(content)) {
				// Set path to copy expression
				abspath = copyExp.exec(content)[1].replace(/\/$/, "");

				// Copy directory recursive
				if (fs.lstatSync(abspath)
					.isDirectory()) {
					var abspathExp = new RegExp("^" + helper.escapeRegExp(abspath), "");

					file.expandFiles(abspath + "/**/*")
						.forEach(function (abspath) {
							var targetFile = abspath.replace(abspathExp, target);

							// Copy file
							file.copy(abspath, targetFile);

							// Log success
							log.ok("Copied: " + targetFile);
						});
				}
				// Copy file
				else {
					// Copy file
					file.copy(abspath, target);

					// Log success
					log.ok("Copied: " + target);
				}
			}
			// Merge files
			else {
				// Replace content parts by other file content
				content = content.replace(importExp, function (all, $1) {
					return file.read($1);
				});

				// Write merged file
				file.write(target, content);

				// Log success
				log.ok("Merged: " + target);
			}
		});
	});

	grunt.registerMultiTask("link", "Link bridged files.", function () {
		var ignoreList = [],
			ignoreName = this.target,
			ignoreBegin = "#Symlinks '" + ignoreName + "' begin",
			ignoreEnd = "#Symlinks '" + ignoreName + "' end",
			ignoreReplace = new RegExp("(^|\\n\\r?)(" + helper.escapeRegExp(ignoreBegin) + ")([^]*?)(" + helper.escapeRegExp(ignoreEnd) + ")", ""),

			srcDest = helper.srcDestHandle(this.file.dest, this.data.strip),
			files = file.expandFiles(this.file.src);

		// Init ignore list of symlinks
		ignoreList.push("");
		ignoreList.push(ignoreBegin);

		// Walk links in group
		files.forEach(function (abspath) {
			var target = srcDest(abspath),
				targetDir = target.replace(/\/[^\/]*$/, ""),

				msg = "Linked: ";

			// Create directory path if not exists
			if (!fs.existsSync(targetDir)) {
				file.mkdir(targetDir);
			}

			// Unlink first if already exists
			if (fs.existsSync(target)) {
				fs.unlinkSync(target);
				msg = "Relinked: ";
			}

			// Create symlink
			fs.symlinkSync(helper.backpath(target) + abspath, target);

			// Add to ignore list
			ignoreList.push(target);

			// Log link
			log.ok(msg + target);
		});

		// Finish ignore list
		ignoreList.push(ignoreEnd);

		// Write new .gitignore
		ignoreList = ignoreList.join("\n");
		file.write(".gitignore", file.read(".gitignore")
			.replace(ignoreReplace, "") + ignoreList);
	});

	grunt.registerMultiTask("clean", "Clean directory.", function () {
		var patterns = this.file.src;

		// Remove symlinks first (prevent delete in linked directories)
		file.expandDirs(patterns)
			.forEach(function (abspath) {
				var lstat = fs.lstatSync(abspath = abspath.replace(/\/$/, ""));

				if (lstat.isSymbolicLink()) {
					fs.unlinkSync(abspath);
				}
			});

		// Remove files (hidden files included)
		file.recurse(".", function (abspath, rootdir, subdir, filename) {
			var testpath = ([])
					.concat(rootdir && rootdir !== "." ? [rootdir] : [])
					.concat(subdir ? [subdir] : [])
					.concat([filename.replace(/^\.+/, "")])
					.join("/");

			if (file.isMatch(patterns, testpath)) {
				fs.unlinkSync(abspath);
			}
		});

		// Remove directories
		file.expandDirs(patterns)
			.reverse()
			.forEach(function (abspath) {
				fs.rmdirSync(abspath);
			});

		// Remove broken symlinks
		file.expand("**/*")
			.forEach(function (abspath) {
				var lstat = fs.lstatSync(abspath = abspath.replace(/\/$/, ""));

				if (lstat.isSymbolicLink() && !fs.existsSync(abspath)) {
					fs.unlinkSync(abspath);
				}
			});
	});

	grunt.registerMultiTask("copy", "Copy files to distribution.", function () {
		var srcDest = helper.srcDestHandle(this.file.dest, this.data.strip),

			files = file.expandFiles(this.file.src);

		files.forEach(function (abspath) {
			file.copy(abspath, srcDest(abspath));
		});
	});

	//
	// Grouped tasks
	//

	// default: Distribute after tests run
	grunt.registerTask("default", "clean:dist:* lint:source:* qunit:source:* copy:dist:* jsmin:dist:* cssmin:dist:*");

	// setup: Initialize
	grunt.registerTask("setup", "clean:*:* bridge:*:* link:*:*");

	// test: Run all tests
	grunt.registerTask("test", "lint:*:* qunit:*:*");

	// build: Distribute
	grunt.registerTask("build", "clean:dist:* copy:dist:* jsmin:dist:* cssmin:dist:*");
};