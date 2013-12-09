/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/event/special/mouse
 */

define("jquery/event/special/mouse", ["jquery"], function ($, undefined) {

	var html = $("html"),

		dragNamespace = "_specialMousedrag",

		wheelNamespace = "_specialMousewheel",

		getId = function (node, obj) {
			return (node[$.expando] || (node[$.expando] = ++$.guid)) + "." + (obj.guid || (obj.guid = ++$.guid));
		},

		mousedown = function (originalBind, originalHandler, originalTarget, namespace, id) {
			mousedown[id] = function (event) {
				var cache;

				html.off("mousemove." + namespace, mousemove[id])
					.off("mouseup." + namespace, mouseup[id])
					.on("mousemove." + namespace, mousemove(originalBind, originalHandler, originalTarget, namespace, id))
					.on("mouseup." + namespace, mouseup(originalBind, originalHandler, originalTarget, namespace, id));

				cache = mousemove[id];

				cache.state = "start";
				cache.startT = cache.deltaT;
				cache.startX = (cache.pageX = event.pageX) + 0;
				cache.startY = (cache.pageY = event.pageY) + 0;
			};
		
			return mousedown[id];
		},

		mousemove = function (originalBind, originalHandler, originalTarget, namespace, id) {
			mousemove[id] = function (event) {
				var cache = mousemove[id];

				event.type = originalBind.type;
				event.target = originalTarget;
				event.data = originalBind.data;

				event.dragState = cache.state;
				event.dragDeltaT = -cache.deltaT + (cache.deltaT = event.timeStamp);
				event.dragDeltaX = event.pageX - cache.pageX;
				event.dragDeltaY = event.pageY - cache.pageY;
				event.dragDelta = Math.sqrt(Math.pow(event.dragDeltaX, 2) + Math.pow(event.dragDeltaY, 2));

				cache.pageX = event.pageX;
				cache.pageY = event.pageY;
				cache.state = "while";

				return originalHandler.apply(originalTarget, arguments);
			};
			
			return  mousemove[id];
		},

		mouseup = function (originalBind, originalHandler, originalTarget, namespace, id) {
			mouseup[id] = function (event) {
				if (mousemove[id]) {
					var cache = mousemove[id];

					html.off("mousemove." + namespace, cache)
						.off("mouseup." + namespace, mouseup[id]);

					event.dragState = "stop";
					event.dragDeltaT = -cache.deltaT + event.timeStamp;
					event.dragDeltaX = 0;
					event.dragDeltaY = 0;
					event.dragDelta = 0;

					originalHandler.apply(originalTarget, arguments);

					delete mousemove[id];
					delete mouseup[id];
				}
			};
			
			return mouseup[id];
		},

		mousewheel = function (originalBind, originalHandler, originalTarget, namespace, id) {
			mousewheel[id] = function (event) {
				var originalEvent = event.originalEvent;

				event.wheelDelta = originalEvent.wheelDelta ? originalEvent.wheelDelta / 120 : originalEvent.detail ? originalEvent.detail / -3 : 0;
				event.wheelDeltaX = originalEvent.wheelDeltaX ? originalEvent.wheelDeltaX / 120 : 0;
				event.wheelDeltaY = originalEvent.wheelDeltaY !== undefined ? originalEvent.wheelDeltaY / 120 : event.wheelDelta;

				// Gecko
				if (originalEvent.axis !== undefined && originalEvent.axis === originalEvent.HORIZONTAL_AXIS) {
					event.wheelDeltaY = 0;
					event.wheelDeltaX = event.wheelDelta;
				}

				event.type = originalBind.type;

				return originalHandler.apply(this, arguments);
			};
			
			return mousewheel[id];
		};

	$.extend($.event.special, {
		mousedrag: {
			// Don't add real event
			setup: $.noop,
			// Add special handler
			add: function (bind) {
				$(this)
					.on("mousedown." + dragNamespace, mousedown(bind, bind.handler, this, dragNamespace, getId(this, bind)));
			},
			// Remove special handler
			remove: function (unbind) {
				var id = getId(this, unbind);

				$(this)
					.off("mousedown." + dragNamespace, mousedown[id]);
				delete mousedown[id];

				html.off("mousemove." + dragNamespace, mousemove[id]);
				delete mousemove[id];

				html.off("mouseup." + dragNamespace, mouseup[id]);
				delete mouseup[id];
			}
		},
		mousewheel: {
			// Add special handler
			add: function (bind) {
				var handler = mousewheel(bind, bind.handler, this, wheelNamespace, getId(this, bind));

				// Gecko
				$(this)
					.on("DOMMouseScroll." + wheelNamespace, handler);

				bind.handler = handler;
			},
			// Remove special handler
			remove: function (unbind) {
				var id = getId(this, unbind);

				// Gecko
				$(this)
					.off("DOMMouseScroll." + wheelNamespace, mousewheel[id]);

				delete mousewheel[id];
			}
		}
	});

	return $;
});