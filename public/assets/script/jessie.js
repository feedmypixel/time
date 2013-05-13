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



    var isOwnProperty;

    /*
     Author:
     David Mark
     */

    if(Object.prototype.hasOwnProperty) {
        isOwnProperty = function(o, p) {
            return o.hasOwnProperty(p);
        };
    }



    /*
     Description:
     Both W3C and MS ActiveXObject implementations providing greatest support
     */

    /*
     Degrades:
     IE4, IE3, NN4
     */

    /*
     Author:
     David Mark
     */

    var createXhrFunctions = [
            function() {
                return new global.ActiveXObject("Microsoft.XMLHTTP");
            },
            // for fully patched Win2k SP4 and up
            function() {
                return new global.ActiveXObject("Msxml2.XMLHTTP.3.0");
            },
            // IE 6 users that have updated their msxml dll files.
            function() {
                return new global.ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
        ],
        i,
        xhrCreate;

    if(isHostMethod(global, "XMLHttpRequest")) {
        try {
            if(new global.XMLHttpRequest()) {
                xhrCreate = function() {
                    return new XMLHttpRequest();
                };
            }
        }
        catch(e) {}
    } else if(isHostMethod(global, 'ActiveXObject')) {
        for (i=createXhrFunctions.length; i--; ) {
            try {
                if (createXhrFunctions[i]()) {
                    xhrCreate = createXhrFunctions[i];
                }
            }
            catch (e) {}
        }
    }



    var mixin;

    /*
     Description:
     Relies on `jessie.isOwnProperty`
     */

    /*
     Degrades:
     */

// TODO: Test the old iteration bug with shadowed built-in properties (e.g. toString)
//       Need another iteration that handles that bug

    if(isOwnProperty) {
        mixin = function(target, source) {
            for(var property in source) {
                if(isOwnProperty(source, property)) {
                    target[property] = source[property];
                }
            }
        };
    }



    /*
     Description:
     Relies on `Function.prototype.apply` and `Array.prototype.slice`
     */

    /*
     Degrades:
     IE5, IE4, IE3
     */

    /*
     Author:
     David Mark
     */

    var bind;

    if(canCall && Array.prototype.slice) {
        bind = function(fn, context) {
            var prependArgs = Array.prototype.slice.call(arguments, 2);

            if (prependArgs.length) {
                return function() {
                    fn.apply(context, Array.prototype.concat.apply(prependArgs, arguments));
                };
            }
            return function() {
                fn.apply(context, arguments);
            };
        };
    }



    /*
     Description:
     Relies on W3C `e.target`
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
     */

    var getEventTarget;

    if(html && isHostMethod(html, 'addEventListener')) {
        getEventTarget = function(e) {
            var target = e.target;
            // Check if not an element (e.g. a text node)
            if (1 != target.nodeType) {
                // Set reference to parent node (which must be an element)
                target = target.parentNode;
            }
            return target;
        };
    }



    /*
     Description:
     Relies on W3C `el.addEventListener`
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
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



    /*global html, isHostObjectProperty*/

    var getElementParentElement;

    /*
     Description:
     Relies on `el.parentNode`
     */

    /*
     Degrades:
     IE5, IE4, IE3
     */

    if(html && isHostObjectProperty(html, 'parentNode')) {
        getElementParentElement = function(el) {
            var parentNode = el.parentNode,
                parentElement = null;

            if(parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
                parentElement = parentNode;
            }
            return parentElement;
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
     Relies on `for`
     */

    var toArray;

    toArray = function(a) {
        var result = [];
        for (var i = 0, l = a.length; i < l; i++) {
            result[i] = a[i];
        }
        return result;
    };



    /*
     Description:
     Relies on the `el.className` property
     */

    /*
     Author:
     David Mark
     */

    var hasClass;

    if(html && 'string' == typeof html.className) {
        hasClass = function(el, className) {
            return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
        };
    }




    /*
     Description:
     Relies on the `el.className` property
     */

    /*
     Author:
     David Mark
     */

    var removeClass;

    if(html && "string" == typeof html.className) {
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
     Relies on the `el.className` property (class attribute)
     */

    /*
     Degrades:
     IE4, IE3
     */

    /*
     Author:
     David Mark
     */

    var addClass;

    if (html && "string" === typeof html.className ) {
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
     Relies on `jessie.xhrCreate` and 'jessie.mixin'
     */

    /*
     Author:
     Adam Silver
     */

    var xhrGet;

// if you can't create one then you certainly can't send one
    if(xhrCreate && bind && mixin && isOwnProperty) {


        xhrGet = function(xhr, url, options) {

            options = options || {};
            options.thisObject = options.thisObject || xhr;

            var successFn,
                failFn,
                completeFn,
                headers = {
                    'X-Requested-With' : 'XMLHttpRequest'
                };

            if(options.headers) {
                mixin(headers, options.headers);
            }

            if(options.success) {
                successFn = bind(options.success, options.thisObject);
            }

            if(options.fail) {
                failFn = bind(options.fail, options.thisObject);
            }

            if(options.complete) {
                completeFn = bind(options.complete, options.thisObject);
            }

            function isSuccessfulResponse(xhr) {
                var success = false,
                    status = xhr.status,
                    between200and300 = (status >= 200 && status < 300),
                    notModified = (status === 304);

                if(between200and300 || notModified || (status === 0 && xhr.responseText)) {
                    success = true;
                }
                return success;
            }

            function handleReadyStateChange() {
                if(xhr.readyState === 4) {
                    if(isSuccessfulResponse(xhr)) {
                        if(successFn) {
                            successFn(xhr.responseText, xhr);
                        }
                    }
                    else if(failFn) {
                        failFn(xhr);
                    }
                    if(completeFn) {
                        completeFn(xhr);
                    }
                }
            }

            xhr.open('GET', url);

            for(var key in headers) {
                if(isOwnProperty( headers, key )){
                    xhr.setRequestHeader(key, headers[key]);
                }
            }

            xhr.onreadystatechange = handleReadyStateChange;
            xhr.send(null);

            return xhr;
        };
    }




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
                    fn.call(currentTarget, e, currentTarget);
                }
            };

            return attachListener(el, eventType, listener);
        };
    }



    /*
     Description:
     Relies on `jessie.getElementParentElement` and `jessie.getElementTagName`
     */

    var getAncestorByTagName;

    if(getElementParentElement && getElementTagName){
        getAncestorByTagName = function(el, tagName) {
            el = getElementParentElement(el);
            while (el && tagName && getElementTagName(el) != tagName) {
                el = getElementParentElement(el);
            }
            return el;
        };
    }



    /*
     Description:
     Relies on el.getAttribute
     */

    /*
     Degrades:
     IE5-
     */

    /*
     Author:
     Graham Veal
     */

    var getElementData;

    if( html && isHostMethod( html, "getAttribute" ) ){

        getElementData = function( el, dataName ){

            return el.getAttribute( 'data-' + dataName );
        };
    }



    /*
     Description:
     Relies on `document.defaultView.getComputedStyle` which degrades in IE8-
     and compatibility modes. No float styles with this one and camel-case
     names.
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
     */

    /*
     Author:
     David Mark
     */

    var getStyleComputed;

    if (isHostObjectProperty(globalDocument, 'defaultView') &&
        isHostMethod(globalDocument.defaultView, 'getComputedStyle')) {
        getStyleComputed = function(el, style) {

            return document.defaultView.getComputedStyle(el, null)[style];
        };
    }



    /*
     Description:
     Relies on `document.getElementsByTagName`
     */

    var getDescendantsByTagName;

    if(globalDocument && isHostMethod(globalDocument, "getElementsByTagName") && toArray) {
        getDescendantsByTagName = function(el, tagName) {
            return toArray((el || document).getElementsByTagName(tagName));
        };
    }



    /*
     Description:
     Relies on `el.insertAdjacentHTML
     IE6 `el.insertAdjacentHtml` does not work on table, tbody, thead, tr elements
     */

    /*
     Degrades:
     IE3, Firefox 7, Safari 3, Opera 7
     */

    /*
     Author:
     Ben Chidgey
     */

    var appendHtml;

    if (html && isHostMethod(html, 'insertAdjacentHTML')) {
        appendHtml = function (el, html) {
            el.insertAdjacentHTML('beforeEnd', html);
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



    /*
     Description:
     Relies on `jessie.xhrCreate` and `jessie.xhrGet`
     */

    /*
     Author:
     Adam Silver
     */

    var ajaxGet;

    if(xhrCreate && xhrGet) {
        ajaxGet = function(url, options) {
            var xhr = xhrCreate();
            return xhrGet(xhr, url, options);
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
     Relies on `document.getElementsByClassName`
     */

    var getDescendantsByClassName;

    if(globalDocument && isHostMethod(globalDocument, "getElementsByClassName") && toArray) {
        getDescendantsByClassName = function(el, className) {
            return toArray((el || document).getElementsByClassName(className));
        };
    }



    /*
     Description:
     Relies on W3C compliant `e.preventDefault()`
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
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



    /*
     Description:
     Uses `Array.prototype.forEach`
     */

    var forEach;

    if (Array.prototype.forEach) {
        forEach = function(elements, callback, thisObject) {
            elements.forEach(callback, thisObject);
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
     Basic rendition which relies on valid markup i.e. forms with unique names and ids
     */

    /*
     See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/fVp-DWAIGnc">Article</a>

     That's the most basic rendition: single document and no allowance for
     screwy markup like this:

     <input name="test">
     <input id="test">
     */

    /*
     Degrades:
     IE4, IE3, NN4
     */

    /*
     Author:
     David Mark
     */

    var getElement;

    if (isHostMethod(document, 'getElementById')) {
        getElement = function(id) {
            return document.getElementById(id);
        };
    }



    /*
     Description:
     Relies on `document.createElement`
     */

    /*
     Author:
     David Mark
     */

    var createElement;

    if(globalDocument && isHostMethod(globalDocument, "createElement")) {
        createElement = function(tagName, doc) {
            return (doc || document).createElement(tagName);
        };
    }



    /*
     Description:
     Relies on `document.addEventListener`.
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
     */

    var attachDocumentListener;

    if(globalDocument && isHostMethod(globalDocument, 'addEventListener')) {
        attachDocumentListener = function(eventType, fn) {

            var listener = function(e) {
                fn.call(document, e);
            };

            document.addEventListener(eventType, listener, false);

            return listener;
        };
    }



    /*
     Description:
     Relies on `window.addEventListener`. No frames.
     */

    /*
     Degrades:
     IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
     */

    /*
     Author:
     David Mark
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
    }


    jessie.isHostMethod = isHostMethod;
    jessie.isHostObjectProperty = isHostObjectProperty;
    jessie.areFeatures = areFeatures;
    jessie.isOwnProperty = isOwnProperty;
    jessie.xhrCreate = xhrCreate;
    jessie.mixin = mixin;
    jessie.bind = bind;
    jessie.getEventTarget = getEventTarget;
    jessie.attachListener = attachListener;
    jessie.getElementParentElement = getElementParentElement;
    jessie.getElementTagName = getElementTagName;
    jessie.toArray = toArray;
    jessie.hasClass = hasClass;
    jessie.removeClass = removeClass;
    jessie.addClass = addClass;
    jessie.xhrGet = xhrGet;
    jessie.delegateListener = delegateListener;
    jessie.getAncestorByTagName = getAncestorByTagName;
    jessie.getElementData = getElementData;
    jessie.getStyleComputed = getStyleComputed;
    jessie.getDescendantsByTagName = getDescendantsByTagName;
    jessie.appendHtml = appendHtml;
    jessie.toggleClass = toggleClass;
    jessie.ajaxGet = ajaxGet;
    jessie.setHtml = setHtml;
    jessie.getDescendantsByClassName = getDescendantsByClassName;
    jessie.cancelDefault = cancelDefault;
    jessie.forEach = forEach;
    jessie.delegateTagNameListener = delegateTagNameListener;
    jessie.getOuterSize = getOuterSize;
    jessie.query = query;
    jessie.getElement = getElement;
    jessie.createElement = createElement;
    jessie.attachDocumentListener = attachDocumentListener;
    jessie.attachWindowListener = attachWindowListener;

    globalDocument = html = null;

})(this);