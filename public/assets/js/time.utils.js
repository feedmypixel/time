time.utils = (function( win, doc, j, time ){

    var htmlElem;
    var hideAddressBarTimer;
    var userScrollInterval;
    var ua = win.navigator.userAgent.toLowerCase();

    function isFirefox(){

        return (/firefox/).test( ua );
    }

    function isAndroid(){

        return (/android/).test( ua );
    }

    function initApp(){

        if( doc.addEventListener ){

            return doc.addEventListener( 'DOMContentLoaded', initApplication(), false );

        } else if( win.attachEvent ){

            return win.attachEvent( 'onload', initApplication );
        }
    }

    function initApplication(){

        addHtmlClass();
        hasUserScrolledWindow();

        time.clock.init();

        buildCarousel();

        hideAddressBar();
    }

    function buildCarousel(){

        var bookPreviewElem = doc.getElementById( 'book-previews-container' );

        new time.Carousel( bookPreviewElem );
    }


    function isTouch(){

        return typeof win.ontouchstart !== 'undefined';
    }

    function getWinScrollPosition(){

        var x = ( typeof win.pageXOffset === 'undefined' ) ? ( doc.documentElement || doc.body.parentNode || doc.body ).scrollLeft : win.pageXOffset;
        var y = ( typeof win.pageYOffset === 'undefined' ) ? ( doc.documentElement || doc.body.parentNode || doc.body ).scrollTop : win.pageYOffset;

        return [ x, y ];
    }

    function hasUserScrolledWindow(){

        userScrollInterval = setInterval( function(){

            var winScrollY = getWinScrollPosition()[ 1 ];

            if( winScrollY > 1 ){

                clearInterval( userScrollInterval );
                clearTimeout( hideAddressBarTimer );
            }

        }, 500 );
    }

    function hideAddressBar(){

        hideAddressBarTimer = setTimeout( function(){

            win.scrollTo( 0, 1 );

            clearInterval( userScrollInterval );

        }, 1000 );
    }

    function addHtmlClass(){

        htmlElem = doc.getElementsByTagName('html')[0];

        if( isTouch() ){

            htmlElem.className = 'touch';
        }
    }

    /**
     * Debounce functionality to send one signal from an event that is firing multiple times.
     * http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
     * @param func
     * @param threshold
     * @param execAsap
     * @return {Function}
     */
    function debounce( func, threshold, execAsap ){
        var timeout;

        return function debounced(){
            var obj = this, args = arguments;

            function delayed(){
                if( !execAsap ){
                    func.apply( obj, args );
                }
                timeout = null;
            }

            if( timeout ){
                clearTimeout( timeout );
            } else if( execAsap ){
                func.apply( obj, args );
            }

            timeout = setTimeout( delayed, threshold || 100 );
        };
    }

    function getFirstElemChild( elem ){

        var child = elem.firstChild;

        while( ( child.nodeType !== 1 ) ){

            child = child.nextSibling;
        }

        return child;
    }

    return {

        isAndroid: isAndroid,
        isFirefox: isFirefox,
        initApp: initApp,
        isTouch: isTouch,
        debounce: debounce,
        hideAddressBar: hideAddressBar,
        getFirstElemChild: getFirstElemChild
    };

}( window, document, jessie, time ));