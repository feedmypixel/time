/*Copyright (c) 2012 Jessie

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/


/*
Return URI:
http://127.0.0.1:1337/?attachListener=3&hasClass=3&addClass=3&removeClass=3&toggleClass=1&getDescendantsByClassName=2&cancelDefault=3&forEach=2&delegateTagNameListener=1&getOuterSize=1&query=1&attachWindowListener=3&getDescendantsByTagName=1&delegateListener=1&getElementTagName=1&getElementParentElement=3&toArray=1&getEventTarget=2&setHtml=1
*/

var jessie;
jessie = jessie || {};
(function(global) {
	
	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			var objectProperty = object[property];
			return typeof objectProperty == 'object' && null !== objectProperty;
		},
		isHostMethod = function(object, method) {
			var objectMethod = object[method];
			var type = typeof objectMethod;
			return	type == 'function' ||
					type == 'object' && null !== objectMethod ||
					type == 'unknown';
		},
		areFeatures = function() {
			var i = arguments.length;
			while (i--) {
				if (!jessie[arguments[i]]) {
				return false;
				}
			}
			return true;
		},
		html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement,
		canCall = !!Function.prototype.call,
		isStyleCapable = !!(html && isHostObjectProperty(html, 'style'));



/*
Description:
For both W3C `e.target` and MS `e.srcElement`
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/uUsSVH7Vcvg">Article</a>
If you will be using a forked rendition to support IE 8-
*/

/*
Degrades:
IE4, IE3, NN4
*/

var getEventTarget;

getEventTarget = function(e) {
	var target = e.target;
	if (target) {
		// Check if not an element (e.g. a text node)
		if (1 != target.nodeType) {
			// Set reference to parent node (which must be an element)
			target = target.parentNode;
		}
	} else {
		target = e.srcElement;
	}
	return target;
};



/*
Description:
Both W3C and MS implementation therefore providing the greatest browser support
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
David Mark
*/

var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) {

		var listener = function(e) {
			fn.call(el, e);
		};

		el.addEventListener(eventType, listener, false);

		return listener;
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	// The "theseObjects" variable must be global
	// or a property of a global object (e.g. a "namespace" object).
	// Stores references to objects used for - this - object in listeners
	jessie.theseObjects = [];

	var theseObjectsIndex = 0;

	attachListener = function(el, eventType, fn) {
		var thisObjectIndex = theseObjectsIndex++;

		// Store reference to object used for - this - in listener
		jessie.theseObjects[thisObjectIndex] = el;

		var listener = function() {
			var e = window.event;
			fn.call(el, e);
		};

		el.attachEvent('on'+eventType, listener);

		// Discard unneeded references
		// Prevents circular references with host objects (e.g. the element)
		// Prevents IE leaks related to such circular references
		// No unload event cleanup required
		el = null;

		return listener;
	};
}



/*
Description:
*/

var toArray;

toArray = function(a) {
	var result = [];
	for (var i = 0, l = a.length; i < l; i++) {
		result[i] = a[i];
	}
	return result;
};



/*global html, isHostObjectProperty, getDescendantsByTagName*/

var getElementParentElement;

/*
Description:
Relies on 'el.parentNode' or 'el.parentElement'
Relies on 'jessie.getDescendantsByTagName'
*/

/*
Degrades:
IE3
*/

if (html && isHostObjectProperty(html, 'parentNode')) {
    getElementParentElement = function(el) {
        var parentNode = el.parentNode,
            parentElement = null;

        if (parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
            parentElement = parentNode;
        }
        return parentElement;
    };
} else if (getDescendantsByTagName && isHostObjectProperty(getDescendantsByTagName('head')[0], 'parentElement')) {
	getElementParentElement = function(el) {
		return el.parentElement;
	};
}



var getElementTagName;

/*
Description:
Relies on `el.tagName` or `el.nodeName`
*/

getElementTagName = function (el) {
	var tagName = (el.tagName || el.nodeName).toLowerCase();
	return tagName.indexOf('html:') > -1 ? tagName.substring(5) : tagName;
};



/*
Description:
Relies on `jessie.attachListener` and `jessie.getEventTarget` `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateListener;

if(attachListener && getEventTarget && canCall) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
			
		var listener = function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(currentTarget, e, currentTarget, el);
			}
		};
		
		return attachListener(el, eventType, listener);
	};
}



/*
Description:
Relies on 'document.getElementsByTagName'
*/

var getDescendantsByTagName;

if(globalDocument && isHostMethod(globalDocument, "getElementsByTagName") && toArray) {
	getDescendantsByTagName = function(el, tagName) {
		return toArray((el || document).getElementsByTagName(tagName));
	};
}



/*
Description:
Relies on the `el.classList.contains` or `el.className` property providing the greatest browser support
*/

/*
Author:
Adam Silver
*/

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
} else if(html && 'string' == typeof html.className) {
	hasClass = function(el, className) {
		return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
	};
}




/*
Description:
Relies on the `el.classList.remove` or `el.className` property providing greatest browser support
*/

/*
Author:
Adam Silver
*/

var removeClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "remove") ) {
    removeClass = function(el, className) {
		return el.classList.remove(className);
    };
} else if(html && "string" == typeof html.className) {
	removeClass = function(el, className) {
		var re, m;
		if (el.className) {
			if (el.className == className) {
				el.className = '';
			} else {
				re = new RegExp('(^|\\s)' + className + '(\\s|$)');
				m = el.className.match(re);
				if (m && m.length == 3) {
					el.className = el.className.replace(re, (m[1] && m[2])?' ':'');
				}
			}
		}
	};
}



/*
Description:
Relies on the `el.classList.add` or `el.className` property providing greatest browser support
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var addClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
	addClass = function(el, className) {
		return el.classList.add(className);
	};
} else if (html && "string" === typeof html.className ) {
    addClass = function(el, className) {
		var re;
		if (!el.className) {
			el.className = className;
		}
		else {
			re = new RegExp('(^|\\s)' + className + '(\\s|$)');
			if (!re.test(el.className)) { el.className += ' ' + className; }
		}
    };
}



/*
Description:
Relies on `el.innerHTML` which degrades in IE3
*/

/*
See: <a href="https://groups.google.com/forum/#!search/david$20mark$20innerHTML/comp.lang.javascript/QQ9ClOT6igQ/LIZ5QXmmuw0J">Related article</a>
NOTE: Don't use this rendition with anything but DIV's
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

var setHtml;

if(html && "string" == typeof html.innerHTML) {
	setHtml = function(el, html) {
		el.innerHTML = html;
	};
}



/*
Description:
Relies on `window.addEventListener` or `window.attachEvent` No frames.
*/

/*
Degrades:
IE4, NN4
*/

/*
Author:
Adam Silver
*/

var attachWindowListener;

if(window && isHostMethod(window, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		
		var listener = function(e) {
			fn.call(window, e);
		};

		window.addEventListener(eventType, listener, false);

		return listener;
	};
} else if(window && isHostMethod(window, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		
		var listener = function() {
			var e = window.event;
			fn.call(window, e);
		};

		window.attachEvent('on'+eventType, listener);

		return listener;
	};
}



/*
Description:
Relies on `document.querySelectorAll` and `jessie.toArray`
*/

/*
Author:
David Mark
*/

var query;

if(globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector, doc) {
		return toArray((doc || document).querySelectorAll(selector));
	};
}



/*
Description:
Relies on `el.offsetWidth/Height`
*/

/*
Degrades:
IE3
*/

/*
Author:
David Mark
*/

var getOuterSize;

if(html && typeof html.offsetWidth == 'number') {
	getOuterSize = function(el) {
		return [el.offsetHeight, el.offsetWidth];
	};
}



/*
Description:
Relies on `jessie.delegateListener` and `jessie.getElementTagName` and `jessie.getElementParentElement`
*/

/*
Author:
Adam Silver
*/

var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {

		var fnDelegate = function(el, target) {
			var sourceNode,
				descendant;

			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			} else {
				descendant = getElementParentElement(target);

				while (null !== descendant && descendant !== el) {
					if (getElementTagName(descendant) === tagName) {
						sourceNode = descendant;
						break;
					}
					descendant = getElementParentElement(descendant);
				}
			}
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}



/*
Description:
Relies on `Function.prototype.call` for browsers without native forEach
*/

var forEach;

if (canCall) {
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			callback.call(thisObject, elements[i], i, elements);
		}
	};
}



/*
Description:
Relies on MS event model `e.returnValue` and on W3C compliant `e.preventDefault()`
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var cancelDefault;
	
if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}



/*
Description:
Relies on `jessie.getDescendantsByTagName` and `jessie.hasClass`
*/

var getDescendantsByClassName;

if (getDescendantsByTagName && hasClass) {
	getDescendantsByClassName = function(el, className) {
		var elements = getDescendantsByTagName(el, '*'),
			element,
			i,
			elementsWithClassName = [];
		for(i = 0; i < elements.length; i++) {
			element = elements[i];
			if(hasClass(element, className)) {
				elementsWithClassName.push(element);
			}
		}
		return elementsWithClassName;
	};
}



/*
 Description:
 Relies on the `jessie.hasClass` && `jessie.addClass` && `jessie.removeClass`
 */

/*
 Author:
 Ben Chidgey
 */

var toggleClass;

if (hasClass && addClass && removeClass) {
	toggleClass = function(el, className) {
		var toggle = hasClass(el, className) ? 'remove' : 'add';
		jessie[toggle + 'Class'](el, className);
	};
}


jessie.isHostMethod = isHostMethod;
jessie.isHostObjectProperty = isHostObjectProperty;
jessie.areFeatures = areFeatures;
jessie.getEventTarget = getEventTarget;
jessie.attachListener = attachListener;
jessie.toArray = toArray;
jessie.getElementParentElement = getElementParentElement;
jessie.getElementTagName = getElementTagName;
jessie.delegateListener = delegateListener;
jessie.getDescendantsByTagName = getDescendantsByTagName;
jessie.hasClass = hasClass;
jessie.removeClass = removeClass;
jessie.addClass = addClass;
jessie.setHtml = setHtml;
jessie.attachWindowListener = attachWindowListener;
jessie.query = query;
jessie.getOuterSize = getOuterSize;
jessie.delegateTagNameListener = delegateTagNameListener;
jessie.forEach = forEach;
jessie.cancelDefault = cancelDefault;
jessie.getDescendantsByClassName = getDescendantsByClassName;
jessie.toggleClass = toggleClass;

	globalDocument = html = null;

}(this));