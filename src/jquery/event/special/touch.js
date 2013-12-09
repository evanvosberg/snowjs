/*
 * @author			Evan Vosberg
 * @copyright		© 2012 by Evan Vosberg
 * @info			http://github.com/evanvosberg
 *
 * @license			Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * @module			jquery/event/special/touch
 */

define("jquery/event/special/touch", ["jquery", "jquery/event/fix"], function ($, undefined) {

	var html = $("html"),

		namespaceDrag = "_specialTouchdrag",

		namespacePinch = "_specialTouchpinch",

		namespacePinchX = "_specialTouchpinchInOut",

		namespaceSwipe = "_specialTouchswipe",

		handlerPinchX = function () {},

		handlerSwipe = function () {},

		// Get the pinch direction by delta pinch value
		getPinch = function (delta, oldDelta, min) {
			return min && Math.abs(delta) < min ? false : !delta ? oldDelta : (delta >= 0 ? "in" : "out");
		},

		// Get the swipe direction by delta drag values
		getSwipe = function (deltaX, deltaY, min) {
			var absX = Math.abs(deltaX),
				absY = Math.abs(deltaY);

			return (Math.abs(absX - absY) <= 1) || !(!min || absX > min || absY > min) ? false : (absX > absY ? (deltaX < 0 ? "left" : "right") : (deltaY < 0 ? "up" : "down"));
		},

		// Get/set the id for element + handler
		getId = function (node, obj) {
			return (node[$.expando] || (node[$.expando] = ++$.guid)) + "." + (obj.guid || (obj.guid = ++$.guid));
		},

		// Check target (may it's a text element)
		isTarget = function (target, originalTarget) {
			var fixedTarget = target.nodeType === 3 ? target.parentNode : target;

			return fixedTarget === originalTarget || $.contains(originalTarget, fixedTarget);
		},

		touchstart = function (originalBind, originalHandler, originalTarget, namespace, id) {
			touchstart[id] = function (event) {
				var touches = event.touches,
					isDrag = originalBind.type === "touchdrag" && touches.length === 1 && isTarget(event.originalTarget, originalTarget),
					isPinch = originalBind.type === "touchpinch" && touches.length === 2 && isTarget(touches[0].target, originalTarget) && isTarget(touches[1].target, originalTarget),
					cache;

				// Setup params
				if (isDrag || isPinch) {
					// Unbind first, tha bind move, end, cancel events
					html.off("touchmove." + namespace, touchmove[id])
						.off("touchend." + namespace, touchend[id])
						.off("touchcancel." + namespace, touchcancel[id])
						.on("touchmove." + namespace, touchmove(originalBind, originalHandler, originalTarget, namespace, id))
						.on("touchend." + namespace, touchend(originalBind, originalHandler, originalTarget, namespace, id))
						.on("touchcancel." + namespace, touchcancel(originalBind, originalHandler, originalTarget, namespace, id));

					cache = touchmove[id];
					cache.direction = true;
					cache.state = "start";
					cache.deltaT = event.timeStamp;
				}
				// TOUCHDRAG setup params
				if (isDrag) {
					cache.startT = cache.deltaT;
					cache.startX = (cache.deltaX = event.pageX) + 0;
					cache.startY = (cache.deltaY = event.pageY) + 0;
				}
				// TOUCHZOOM setup params
				if (isPinch) {
					cache.delta = Math.sqrt(
					Math.pow(cache.startX = (cache.deltaX = Math.abs(touches[0].pageX - touches[1].pageX)) + 0, 2) + Math.pow(cache.startY = (cache.deltaY = Math.abs(touches[0].pageY - touches[1].pageY)) + 0, 2));
					cache.start = cache.delta + 0;
				}
			};

			return touchstart[id];
		},

		touchmove = function (originalBind, originalHandler, originalTarget, namespace, id) {
			touchmove[id] = function (event) {
				var touches = event.touches,
					isDrag = originalBind.type === "touchdrag",
					isPinch = originalBind.type === "touchpinch" && touches.length >= 2,
					cache = touchmove[id],
					state,
					deltaT,
					deltaX,
					deltaY,
					delta,
					direction,
					_direction;

				// TOUCHDRAG modify event params
				if (isDrag) {
					state = event.dragState = cache.state;
					deltaT = event.dragDeltaT = -cache.deltaT + (cache.deltaT = event.timeStamp);
					deltaX = event.dragDeltaX = -cache.deltaX + (cache.deltaX = event.pageX);
					deltaY = event.dragDeltaY = -cache.deltaY + (cache.deltaY = event.pageY);
					delta = event.dragDelta = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
					_direction = cache.direction;
					direction = getSwipe(deltaX, deltaY);
				}
				// TOUCHZOOM modify event params
				if (isPinch) {
					event.pinchState = cache.state;
					event.pinchDeltaT = -cache.deltaT + (cache.deltaT = event.timeStamp);
					event.pinchDeltaX = -cache.deltaX + (cache.deltaX = deltaX = Math.abs(touches[0].pageX - touches[1].pageX));
					event.pinchDeltaY = -cache.deltaY + (cache.deltaY = deltaY = Math.abs(touches[0].pageY - touches[1].pageY));
					event.pinchDelta = -cache.delta + (cache.delta = delta = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
					direction = getPinch(event.pinchDelta, _direction = cache.direction);
				}

				// Trigger
				if (isDrag || isPinch) {
					event.type = originalBind.type;
					event.target = originalTarget;
					event.data = originalBind.data;
					cache.state = "while";
					cache.direction = direction && _direction ? _direction !== true ? (direction === _direction ? direction : false) : direction : _direction;

					// $.event.trigger( event, originalBind.data, originalTarget, true );
					// Doesn't work because it prevents default
					originalHandler.apply(originalTarget, arguments);
				}
			};

			return touchmove[id];
		},

		touchend = function (originalBind, originalHandler, originalTarget, namespace, id) {
			touchend[id] = function (event) {
				if (touchmove[id]) {
					// Unbind events
					html.off("touchmove." + namespace, touchmove[id])
						.off("touchend." + namespace, touchend[id])
						.off("touchcancel." + namespace, touchcancel[id]);

					var isDrag = originalBind.type === "touchdrag" && /^touch(end|cancel|drag)$/.test(event.type),
						isPinch = originalBind.type === "touchpinch" && /^touch(end|cancel)$/.test(event.type),
						cache = touchmove[id],
						deltaT,
						deltaX,
						deltaY,
						delta,
						direction,
						_direction;

					delete touchmove[id];
					delete touchend[id];
					delete touchcancel[id];

					// TOUCHDRAG modify event params
					if (isDrag) {
						event.dragState = cache.state = "stop";
						event.dragDeltaT = -cache.deltaT + event.timeStamp;
						event.dragDeltaX = 0;
						event.dragDeltaY = 0;
						event.dragDelta = 0;
					}
					// TOUCHZOOM modify event params
					if (isPinch) {
						event.pinchState = cache.state = "stop";
						event.pinchDeltaT = -cache.deltaT + event.timeStamp;
						event.pinchDeltaX = 0;
						event.pinchDeltaY = 0;
						event.pinchDelta = 0;
					}

					// Trigger
					if (isDrag || isPinch) {
						event.type = originalBind.type;
						event.target = originalTarget;
						event.data = originalBind.data;

						//$.event.trigger( event, originalBind.data, originalTarget, true );
						// Doesn't work because it prevents default
						originalHandler.apply(originalTarget, arguments);
					}

					// TOUCHSWIPE modify event params
					if (isDrag && namespace === namespaceSwipe) {
						delete(event.dragState);

						deltaT = event.dragDeltaT = -cache.startT + event.timeStamp;
						deltaX = event.dragDeltaX = -cache.startX + cache.deltaX;
						deltaY = event.dragDeltaY = -cache.startY + cache.deltaY;
						_direction = cache.direction;
						direction = getSwipe(deltaX, deltaY, 20);

						if (direction && _direction === direction) {
							event.type = "touchswipe" + direction;
							$(originalTarget)
								.trigger(event);
						}
					}

					// TOUCHPINCH IN / OUT modify event params
					if (isPinch && namespace === namespacePinchX) {
						delete(event.pinchState);

						deltaT = event.pinchDeltaT = -cache.startT + event.timeStamp;
						deltaX = event.pinchDeltaX = -cache.startX + cache.deltaX;
						deltaY = event.pinchDeltaY = -cache.startY + cache.deltaY;
						delta = event.pinchDelta = -cache.start + cache.delta;
						direction = getPinch(delta, _direction = cache.direction, 80);

						if (direction && _direction === direction) {
							event.type = "touchpinch" + direction;
							$(originalTarget)
								.trigger(event);
						}
					}
				}
			};

			return touchend[id];
		},

		touchcancel = touchend;

	// Touchdrag, touchpinch
	$.each({
		touchdrag: namespaceDrag,
		touchpinch: namespacePinch
	}, function (name, namespace) {

		$.event.special[name] = {
			// Don't add real event
			setup: $.noop,

			// Add special handler
			add: function (bind) {
				var id = getId(this, bind);

				namespace = bind.namespace === namespaceSwipe ? namespaceSwipe : bind.namespace === namespacePinchX ? namespacePinchX : namespace;

				$(this)
					.on("touchstart." + namespace, touchstart(bind, bind.handler, this, namespace, id));
			},

			// Remove special handler
			remove: function (unbind) {
				var id = getId(this, unbind);

				namespace = unbind.namespace === namespaceSwipe ? namespaceSwipe : unbind.namespace === namespacePinchX ? namespacePinchX : namespace;

				$(this)
					.off("touchstart." + namespace, touchstart[id]);
				delete touchstart[id];

				html.off("touchmove." + namespace, touchmove[id]);
				delete touchmove[id];

				html.off("touchend." + namespace, touchend[id]);
				delete touchend[id];

				html.off("touchcancel." + namespace, touchcancel[id]);
				delete touchcancel[id];
			}
		};

	});

	// Touchpinchin, touchpinchout
	$.each({
		"in": namespacePinchX,
		"out": namespacePinchX
	}, function (name, namespace) {

		$.event.special["touchpinch" + name] = {
			// Don't add real event
			setup: $.noop,

			// Add special handler
			add: function () {
				if (!touchstart[getId(this, handlerPinchX)]) {
					$(this)
						.on("touchpinch." + namespace, handlerPinchX);
				}
			}
		};

	});

	// Touchswipeup, touchswiperight,touchswipedown,touchswipeleft
	$.each({
		up: namespaceSwipe,
		right: namespaceSwipe,
		down: namespaceSwipe,
		left: namespaceSwipe
	}, function (name, namespace) {

		$.event.special["touchswipe" + name] = {
			// Don't add real event
			setup: $.noop,

			// Add special handler
			add: function () {
				if (!touchstart[getId(this, handlerSwipe)]) {
					$(this)
						.on("touchdrag." + namespace, handlerSwipe);
				}
			}
		};

	});

	/* >>>> DEPRECATED >>>> */
	var zoom = {},
		zoomMap = "State DeltaT DeltaX DeltaY Delta".split(" ");
	$.event.special.touchzoom = {
		// Don't add real event
		setup: $.noop,

		// Add special handler
		add: function (bind) {
			$(this)
				.on("touchpinch." + namespacePinch, (
			zoom[getId(this, bind)] = function (event) {
				for (var i = 0, l = zoomMap.length; i < l; i++) {
					event["zoom" + zoomMap[i]] = event["pinch" + zoomMap[i]];
					delete event["pinch" + zoomMap[i]];
				}
				event.type = "touchzoom";
				bind.handler.apply(this, arguments);
			}));
		},

		// Remove special handler
		remove: function (unbind) {
			var id = getId(this, unbind);

			$(this)
				.off("touchpinch." + namespacePinch, zoom[id]);
			delete zoom[id];
		}
	};
	/* <<<< DEPRECATED <<<< */

	return $;
});