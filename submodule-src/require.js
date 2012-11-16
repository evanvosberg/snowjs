/*import("submodule/requirejs/require.js")*/

require({
	map: {
		"*": {
			"script": "require/script",
			"$dict": "require/jquery-dict",
			"$i18n": "require/jquery-i18n",
			"$ready": "require/jquery-ready",
			"$tmpl": "require/jquery-tmpl"
		}
	}
});