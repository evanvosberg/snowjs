module.exports = function (grunt) {

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
			}
		},

		// Paths config
		paths = {
			// Distribution destination
			dest: "dist",
			// Development source
			src: "src",
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

		clean: {
			"dist": "<%= paths.dest %>/**/*"
		},

		copy: {
			"dist": {
				dest: "<%= paths.dest %>",
				strip: /^[^\/]+\//,
				src: "<%= paths.src %>/**/*"
			}
		},

		jsmin: {
			"dist": "<%= paths.dest %>/**/*.js"
		},

		cssmin: {
			"dist": "<%= paths.dest %>/**/*.css"
		},

		qunit: {
			"source": "<%= paths.test %>/**/*.html",
			"dev": "<%= paths.test %>/require/script.html"
		},

		lint: {
			"source": grunt.file.expandFiles(paths.src + "/**/*.js")
				.filter(function (abspath) {
					// Exclude external file and i18n definitions
					return !(/jquery\/i18n\//)
						.test(abspath) && !fs.lstatSync(abspath)
						.isSymbolicLink();
				}),
			"grunt": "grunt.js"
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
		},

		linkignore: {
			"source": {
				src: "<%= paths.src %>/**/*"
			}
		},

		link: {
			// {
			//  link: "path/reletive/to/this/file",
			//  to: "path/reletive/to/this/file"
			// }
			"Require-JS": [{
				link: "<%= paths.src %>/require.js",
				to: "external/requirejs/require.js"
			}],
			"jQuery": [{
				link: "<%= paths.src %>/jquery.js",
				to: "external/jquery/dist/jquery.js"
			}],
			"jQuery-UI": [{
				link: "<%= paths.src %>/jquery/effects.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/blind.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-blind.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/bounce.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-bounce.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/clip.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-clip.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/drop.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-drop.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/explode.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-explode.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/fade.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-fade.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/fold.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-fold.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/highlight.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-highlight.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/pulsate.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-pulsate.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/scale.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-scale.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/shake.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-shake.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/slide.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-slide.js"
			}, {
				link: "<%= paths.src %>/jquery/effects/transfer.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.effect-transfer.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/accordion.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.accordion.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/autocomplete.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.autocomplete.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/button.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.button.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/core.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.core.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/datepicker.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.datepicker.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/dialog.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.dialog.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/draggable.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.draggable.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/droppable.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.droppable.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/menu.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.menu.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/mouse.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.mouse.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/position.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.position.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/progressbar.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.progressbar.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/resizable.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.resizable.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/selectable.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.selectable.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/slider.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.slider.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/sortable.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.sortable.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/spinner.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.spinner.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/tabs.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.tabs.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/tooltip.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.tooltip.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/widget.js",
				to: "external/jquery-ui/dist/jquery-ui/ui/jquery.ui.widget.js"
			}, {
				link: "<%= paths.src %>/jquery/ui/images",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/images"
			}, {
				link: "<%= paths.src %>/jquery/ui/accordion.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.accordion.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/autocomplete.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.autocomplete.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/button.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.button.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/core.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.core.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/datepicker.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.datepicker.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/dialog.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.dialog.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/menu.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.menu.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/progressbar.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.progressbar.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/resizable.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.resizable.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/selectable.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.selectable.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/slider.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.slider.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/spinner.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.spinner.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/tabs.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.tabs.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/theme.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.theme.css"
			}, {
				link: "<%= paths.src %>/jquery/ui/tooltip.css",
				to: "external/jquery-ui/dist/jquery-ui/themes/base/jquery.ui.tooltip.css"
			}],
			"jQuery-Color": [{
				link: "<%= paths.src %>/jquery/color.js",
				to: "external/jquery-color/dist/jquery.color.js"
			}, {
				link: "<%= paths.src %>/jquery/color/svg-names.js",
				to: "external/jquery-color/dist/jquery.color.svg-names.js"
			}],
			"jQuery-Datalink": [{
				link: "<%= paths.src %>/jquery/fn/datalink.js",
				to: "external/jquery-datalink/jquery.datalink.js"
			}],
			"jQuery-Template": [{
				link: "<%= paths.src %>/jquery/tmpl.js",
				to: "external/jquery-tmpl/jquery.tmpl.js"
			}],
			"jQuery-Metadata": [{
				link: "<%= paths.src %>/jquery/metadata.js",
				to: "external/jquery-metadata/jquery.metadata.js"
			}],
			"jQuery-Cookie": [{
				link: "<%= paths.src %>/jquery/cookie.js",
				to: "external/jquery-cookie/jquery.cookie.js"
			}],
			"jQuery-scrollTo": [{
				link: "<%= paths.src %>/jquery/fn/scrollto.js",
				to: "external/jquery.scrollTo/jquery.scrollTo.js"
			}],
			"JSON-js": [{
				link: "<%= paths.src %>/util/json.js",
				to: "external/JSON-js/json2.js"
			}]
		}
	});


	//
	// Tasks
	//


	grunt.registerMultiTask("link", "Link files from other sources.", function () {
		var links = this.file.src;

		// Walk links in group
		links.forEach(function (ln) {
			var lg = {
					type: "fail",
					msg: "Link failed"
				};

			if (fs.existsSync(ln.to)) {
				var lnDir = ln.link.replace(/\/[^\/]*$/, "");

				lg.type = "ok";
				lg.msg = "Link";

				// Create directory path if not exists
				if (!fs.existsSync(lnDir)) {
					file.mkdir(lnDir);
				}

				// Unlink first if already exists
				if (fs.existsSync(ln.link)) {
					fs.unlinkSync(ln.link);
					lg.msg = "Relink";
				}

				// Create symlink
				fs.symlinkSync(helper.backpath(ln.link) + ln.to, ln.link, ln.type || "file");
			}

			// Log link
			log[lg.type](lg.msg + ": " + ln.link);
		});
	});

	grunt.registerMultiTask("linkignore", "Add symlinks to git ignore list.", function () {
		var paths = file.expand(this.file.src),
			ignoreList = [],
			ignoreName = this.target,
			ignoreBegin = "#Symlinks '" + ignoreName + "' begin",
			ignoreEnd = "#Symlinks '" + ignoreName + "' end",
			ignoreReplace = new RegExp("(^|\\n\\r?)(" + helper.escapeRegExp(ignoreBegin) + ")([^]*?)(" + helper.escapeRegExp(ignoreEnd) + ")", "");

		// Create ignore list of symlinks
		ignoreList.push("");
		ignoreList.push(ignoreBegin);
		paths.forEach(function (abspath) {
			abspath = abspath.replace(/\/$/, "");
			
			if (fs.lstatSync(abspath)
				.isSymbolicLink()) {
				ignoreList.push(abspath);
				log.ok("Ignore: " + abspath);
			}
		});
		ignoreList.push(ignoreEnd);

		// Write new .gitignore
		file.write(".gitignore", file.read(".gitignore")
			.replace(ignoreReplace, "") + ignoreList.join("\n"));
	});

	grunt.registerMultiTask("clean", "Clean directory.", function () {
		file.expandDirs(this.file.src)
			.forEach(function (abspath) {
				abspath = abspath.replace(/\/$/, "");
				
				if (fs.lstatSync(abspath)
					.isSymbolicLink()) {
					fs.unlinkSync(abspath);
				}
			});

		file.expandFiles(this.file.src)
			.forEach(function (abspath) {
				fs.unlinkSync(abspath);
			});

		file.expandDirs(this.file.src)
			.reverse()
			.forEach(function (abspath) {
				fs.rmdirSync(abspath);
			});
	});

	// Task: copy
	grunt.registerMultiTask("copy", "Copy files to distribution.", function () {
		var dest = this.file.dest.replace(/\/$/, "") + "/",
			files = file.expandFiles(this.file.src),

			stripExpr = this.data.strip || (/^$/),
			strip = function (str) {
				return str.replace(stripExpr, "");
			};

		if (typeof stripExpr === "string") {
			stripExpr = new RegExp("^" + helper.escapeRegExp(stripExpr));
		}
		else if (typeof stripExpr === "function") {
			strip = this.file.strip;
		}

		files.forEach(function (abspath) {
			file.copy(abspath, dest + strip(abspath));
		});
	});

	grunt.registerMultiTask("jsmin", "Minify javascript files in distribution.", function () {
		var uglify = require("uglify-js"),
			files = file.expandFiles(this.file.src);

		files.forEach(function (abspath) {
			file.write(abspath.replace(/\.(.+)$/, ".min.$1"), uglify(file.read(abspath)));
		});
	});

	grunt.registerMultiTask("cssmin", "Minify css files in distribution.", function () {
		var sqwish = require("sqwish"),
			files = file.expandFiles(this.file.src);

		files.forEach(function (abspath) {
			file.write(abspath.replace(/\.(.+)$/, ".min.$1"), sqwish.minify(file.read(abspath)));
		});
	});


	//
	// Grouped tasks
	//

	// Build distribution
	grunt.registerTask("default", "clean:dist:* lint:source:* qunit:source:* copy:dist:* jsmin:dist:* cssmin:dist:*");

	// Initialize
	grunt.registerTask("setup", "link:*:* linkignore:*:*");

	// Run development tests
	grunt.registerTask("test", "lint:*:* qunit:*:*");
};