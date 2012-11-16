/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			util/mime
 */

define("util/mime", ["module", "jquery"], function (mod, $) {

	var regxGroups = /([a-z]+\/\*)/gi,

		regxGroup = /([a-z]+\/\*)/i,

		regxMime = /\//,

		replaceGroup = function (string, found) {
			return module.config.groups[found] || found;
		},

		replaceGroups = function (mime) {
			return mime.replace(regxGroups, replaceGroup);
		},

		getBySuffix = function (suffix) {
			var ret = module.config.unknow;
			$.each(module.config.mimeRegxMap, function (i, name) {
				if (name.test(suffix)) {
					ret = i;
					return false;
				}
			});
			return ret;
		},

		module = {
			config: $.extend(true, {
				mimeRegxMap: {
					// image
					"image/png": /^(png)$/i,
					"image/jpeg": /^(jpe|jpeg|jpg)$/i,
					"image/gif": /^(gif)$/i,
					"image/bmp": /^(bmp)$/i,
					"image/vnd.microsoft.icon": /^(ico)$/i,
					"image/tiff": /^(tif|tif)$/i,
					"image/svg+xml": /^(svg|svgz)$/i,
					"image/x-win-bitmap": /^(cur)$/i,
					// audio/video
					"audio/basic": /^(au)$/i,
					"audio/mpeg": /^(mp3)$/i,
					"audio/mp4a-latm": /^(m4p|m4b|m4a)$/i,
					"audio/x-wav": /^(wav)$/i,
					"audio/ogg": /^(ogg|oga|spx)$/i,
					"audio/flac": /^(flac)$/i,
					"audio/x-ms-wma": /^(wma)$/i,
					"audio/x-pn-realaudio": /^(ra|ram)$/i,
					"application/vnd.rn-realmedia": /^(rm)$/i,
					"video/ogg": /^(ogv)$/i,
					"video/mp4": /^(mp4)$/i,
					"video/mpeg": /^(mpe|mpg|mpeg|mpga)$/i,
					"video/quicktime": /^(qt|mov)$/i,
					"video/x-msvideo": /^(avi)$/i,
					"video/x-flv": /^(flv)$/i,
					"video/x-ms-wmv": /^(wmv)$/i,
					// web
					"text/plain": /^(txt)$/i,
					"text/html": /^(htm|html|shtml|php|php4)$/i,
					"text/css": /^(css)$/i,
					"text/x-actionscript": /^(as)$/i,
					"application/javascript": /^(js)$/i,
					"application/json": /^(json)$/i,
					"application/xml": /^(xml|plist)$/i,
					"application/x-shockwave-flash": /^(swf)$/i,
					// archives
					"application/zip": /^(zip)$/i,
					"application/gzip": /^(gz)$/i,
					"application/x-tar": /^(tar)$/i,
					"application/x-rar-compressed": /^(rar)$/i,
					"application/x-msdownload": /^(exe|msi)$/i,
					"application/vnd.ms-cab-compressed": /^(cab)$/i,
					// adobe
					"application/pdf": /^(pdf)$/i,
					"image/vnd.adobe.photoshop": /^(psd)$/i,
					"application/postscript": /^(ai|eps|ps)$/i,
					// ms office
					"application/msword": /^(doc)$/i,
					"application/x-dot": /^(dot)$/i,
					"application/rtf": /^(rtf)$/i,
					"application/vnd.ms-excel": /^(xls|xla)$/i,
					"application/vnd.ms-powerpoint": /^(ppt)$/i,
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document": /^(docx)$/i,
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": /^(xlsx)$/i,
					// other
					"application/x-director": /^(cdr)$/i
				},
				groups: {
					"previewable/*": "image/png,image/jpeg,image/jpg,image/gif,image/vnd.microsoft.icon"
				},
				unknow: "application/octet-stream"
			}, mod.config()),

			mime: function (mime, accept) {
				// group replace
				if (regxGroup.test(mime)) {
					return replaceGroups(mime);
				}
				// detect mime by suffix
				if (!regxMime.test(mime)) {
					mime = getBySuffix(mime);
				}
				// check
				if (regxMime.test(accept)) {
					accept = replaceGroups(accept)
						.split(",");

					var ret = false;
					$.each(accept, function (i, name) {
						name = $.trim(name);
						if ((regxGroup.test(name) && mime.split("/")[0] === name.split("/")[0]) || mime === name || name === "*/*") {
							ret = true;
							return false;
						}
					});
					mime = ret;
				}

				return mime;
			}
		};

	return module;

});