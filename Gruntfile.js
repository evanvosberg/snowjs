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

		link: {
			"external": {
				dest: "<%= paths.src %>",
				strip: /^[^\/]+\//,
				src: ".<%= paths.external %>/**/*"
			}
		},

		clean: {
			"dist": {
				src: "<%= paths.dest %>/**/*"
			},
			"external": {
				src: ".<%= paths.external %>/**/*"
			}
		},

		copy: {
			"dist": {
				dest: "<%= paths.dest %>/lib",
				strip: /^[^\/]+\//,
				src: "<%= paths.src %>/**/*"
			},
			"dist-min": {
				dest: "<%= paths.dest %>/lib-min",
				strip: /^[^\/]+\//,
				src: "<%= paths.src %>/**/*"
			}
		},

		jsmin: {
			"dist-min": {
				src: "<%= paths.dest %>/lib-min/**/*.js"
			}
		},

		cssmin: {
			"dist-min": {
				src: "<%= paths.dest %>/lib-min/**/*.js"
			}
		},

		snow: {
			"external": {
				dest: ".<%= paths.external %>",
				src: "<%= paths.external %>/*.js"
			}
		},

		qunit: {
			"source": {
				src: "<%= paths.test %>/**/*.html"
			}
		},

		jshint: {
			"source": {
				files: {
					src: (grunt.file)
						.expand(paths.src + "/**/*.js")
						.filter(function (abspath) {
							var stat = fs.lstatSync(abspath);

							// Exclude external file and i18n definitions
							return !(/jquery\/i18n\//.test(abspath) || stat.isDirectory() || stat.isSymbolicLink());
						})
				},
				options: {
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
				}
			},
			"external": {
				files: {
					src: "<%= paths.external %>/*.js",
				},
				options: {
					globals: {
						require: true,
						snow: true,
						__dirname: true,
						__filename: true
					},
					unused: false
				}
			},
			"grunt": {
				files: {
					src: ["Gruntfile.js", "grunt/**/*.js"]
				},
				options: {
					globals: {
						module: true,
						define: true,
						require: true
					}
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

	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.task.registerMultiTask("link", "Link bridged files.", function () {
		var ignoreList = [],
			ignoreName = this.target,
			ignoreBegin = "#Symlinks '" + ignoreName + "' begin",
			ignoreEnd = "#Symlinks '" + ignoreName + "' end",
			ignoreReplace = new RegExp("(^|\\n\\r?)(" + helper.escapeRegExp(ignoreBegin) + ")([^]*?)(" + helper.escapeRegExp(ignoreEnd) + ")", ""),

			srcDest = helper.srcDestHandle(this.data.dest, this.data.strip),
			files = (grunt.file)
				.expand(this.data.src)
				.filter(function (abspath) {
					return !(fs)
						.lstatSync(abspath)
						.isDirectory();
				});

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
				grunt.file.mkdir(targetDir);
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
		grunt.file.write(".gitignore", file.read(".gitignore")
			.replace(ignoreReplace, "") + ignoreList);
	});

	grunt.task.registerMultiTask("clean", "Clean directory.", function () {
		var patterns = this.data.src,

			listLinks = [],
			listHiddenFiles = [],
			listDirectories = [],
			listBrokenLinks = [];

		// Collect symlinks first (prevent delete in linked directories)
		(grunt.file)
			.expand(patterns)
			.filter(function (abspath) {
				return (fs)
					.lstatSync(abspath)
					.isDirectory();
			})
			.forEach(function (abspath) {
				var lstat = fs.lstatSync(abspath = abspath.replace(/\/$/, ""));

				if (lstat.isSymbolicLink()) {
					listLinks.push(abspath);
				}
			});

		// Collect files (hidden files included)
		(grunt.file)
			.recurse(".", function (abspath, rootdir, subdir, filename) {
				var testpath = ([])
						.concat(rootdir && rootdir !== "." ? [rootdir] : [])
						.concat(subdir ? [subdir] : [])
						.concat([filename.replace(/^\.+/, "")])
						.join("/");

				if (grunt.file.isMatch(patterns, testpath)) {
					listHiddenFiles.push(abspath);
				}
			});

		// Collect directories
		(grunt.file)
			.expand(patterns)
			.filter(function (abspath) {
				return (fs)
					.lstatSync(abspath)
					.isDirectory();
			})
			.reverse()
			.forEach(function (abspath) {
				listDirectories.push(abspath);
			});

		// Remove symlinks
		listLinks.forEach(function (abspath) {
			fs.unlinkSync(abspath);
		});

		// Remove files
		listHiddenFiles.forEach(function (abspath) {
			fs.unlinkSync(abspath);
		});

		// Remove directories
		listDirectories.forEach(function (abspath) {
			fs.rmdirSync(abspath);
		});

		// Collect broken symlinks
		(grunt.file)
			.expand("**/*")
			.forEach(function (abspath) {
				var lstat = fs.lstatSync(abspath = abspath.replace(/\/$/, ""));

				if (lstat.isSymbolicLink() && !fs.existsSync(abspath)) {
					listBrokenLinks.push(abspath);
				}
			});


		// Remove files
		listBrokenLinks.forEach(function (abspath) {
			fs.unlinkSync(abspath);
		});
	});

	grunt.task.registerMultiTask("copy", "Copy files to distribution.", function () {
		var srcDest = helper.srcDestHandle(this.data.dest, this.data.strip),

			files = (grunt.file)
				.expand(this.data.src)
				.filter(function (abspath) {
					return !(fs)
						.lstatSync(abspath)
						.isDirectory();
				});


		files.forEach(function (abspath) {
			grunt.file.copy(abspath, srcDest(abspath));
		});
	});

	//
	// Grouped tasks
	//

	// default: Distribute after tests run
	grunt.task.registerTask("default", ["clean:dist:*", "jshint:source:*", "qunit:source:*", "copy:dist:*", "copy:dist-min:*", "jsmin:dist-min:*", "cssmin:dist-min:*"]);

	// setup: Initialize
	grunt.task.registerTask("setup", ["clean:*:*", "snow:*:*", "link:*:*"]);

	// test: Run all tests
	grunt.task.registerTask("test", ["jshint:*:*", "qunit:*:*"]);

	// build: Distribute
	grunt.task.registerTask("build", ["clean:dist:*", "copy:dist:*", "copy:dist-min:*", "jsmin:dist-min:*", "cssmin:dist-min:*"]);
};